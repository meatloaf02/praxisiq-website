#!/usr/bin/env node

/**
 * update-content.js
 *
 * Extracts marketing-safe product and services content from a PraxisIQ
 * overview document and writes it to Eleventy _data JSON files.
 *
 * Usage:
 *   node scripts/update-content.js path/to/overview.docx
 *   node scripts/update-content.js path/to/overview.docx --dry-run
 *
 * Requirements:
 *   npm install @anthropic-ai/sdk mammoth
 *   Environment variable: ANTHROPIC_API_KEY
 *
 * What it does:
 *   1. Reads the DOCX file and extracts text via mammoth
 *   2. Sends the text to Claude with an IP-filtering system prompt
 *   3. Writes the structured JSON output to src/_data/products.json and src/_data/services.json
 *   4. Optionally commits and pushes (triggering GitHub Pages deploy)
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const DATA_DIR = path.resolve(__dirname, "../src/_data");
const MODEL = "claude-sonnet-4-20250514";
const MAX_TOKENS = 8192;

// ---------------------------------------------------------------------------
// IP filter prompt — this is the core of the automation
// ---------------------------------------------------------------------------

const SYSTEM_PROMPT = `You are a content extraction assistant for PraxisIQ, a higher education software company.

Your job: extract product and services content from an internal overview document and output it as two JSON objects suitable for a public marketing website.

CRITICAL IP PROTECTION RULES — never include any of the following in your output:
- Specific pricing, dollar amounts, or tier structures
- Competitive landscape analysis or competitor names
- Go-to-market strategy, sales motion details, or budget-line targeting
- Product roadmap, timelines, or phase plans
- Team composition, hiring plans, or role descriptions
- Specific financial projections, market sizing numbers, or revenue targets
- Fundraising plans or investment details
- Specific regulatory citation numbers (e.g. "34 CFR 668.14(b)(33)") — refer to compliance generically
- Specific enforcement actions, penalty amounts, or named institutions from audit findings
- Technical implementation details (algorithms, ML approaches, model architecture)
- Internal metrics like "estimated $X leakage" or "Y% adoption rate"

WHAT TO INCLUDE (customer-facing marketing content):
- Module names and benefit-oriented descriptions
- Capability names with plain-language descriptions of what they do for the user
- High-level differentiators framed as customer benefits
- General onboarding approach (fast, file-based, no IT integration)
- The conversational interface concept (administrators interact in plain language)
- Compliance-first positioning (without revealing specific regulatory mappings)
- Cross-domain intelligence as a benefit (without revealing architecture)

OUTPUT FORMAT:
Return a JSON object with exactly two keys: "products" and "services".

The "products" value must match this schema:
{
  "headline": "string",
  "subheadline": "string",
  "intro": "string (2-3 sentences, marketing voice)",
  "differentiators": [
    { "id": "slug", "title": "string", "description": "string (1-2 sentences)" }
  ],
  "modules": [
    {
      "id": "slug",
      "name": "string",
      "icon": "one of: calendar, shield-check, chart-pie",
      "tagline": "string (under 10 words)",
      "description": "string (2-3 sentences, benefit-oriented)",
      "capabilities": [
        { "name": "string", "description": "string (1-2 sentences)" }
      ]
    }
  ]
}

The "services" value must match this schema:
{
  "headline": "string",
  "subheadline": "string",
  "onboarding": {
    "title": "string",
    "description": "string (2-3 sentences)",
    "steps": [
      { "step": 1, "title": "string", "description": "string (1-2 sentences)" }
    ]
  },
  "approach": {
    "title": "string",
    "points": [
      { "title": "string", "description": "string (1-2 sentences)" }
    ]
  },
  "cta": {
    "heading": "string",
    "description": "string (1-2 sentences)",
    "button_text": "string",
    "button_link": "/about/#contact"
  }
}

Return ONLY the JSON object. No markdown fences, no preamble, no commentary.`;

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const autoCommit = args.includes("--commit");
  const docxPath = args.find((a) => !a.startsWith("--"));

  if (!docxPath) {
    console.error("Usage: node scripts/update-content.js <path-to-docx> [--dry-run] [--commit]");
    process.exit(1);
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("Error: ANTHROPIC_API_KEY environment variable is required.");
    console.error("Set it with: export ANTHROPIC_API_KEY=your-key-here");
    process.exit(1);
  }

  // Step 1: Extract text from DOCX
  console.log(`Reading ${docxPath}...`);
  const mammoth = require("mammoth");
  const result = await mammoth.extractRawText({ path: docxPath });
  const documentText = result.value;
  console.log(`Extracted ${documentText.length} characters from document.`);

  // Step 2: Send to Claude API for structured extraction
  console.log(`Sending to Claude (${MODEL}) for content extraction...`);
  const Anthropic = require("@anthropic-ai/sdk");
  const client = new Anthropic.default();

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `Extract marketing-safe product and services content from this internal overview document:\n\n${documentText}`,
      },
    ],
  });

  const rawOutput = response.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("");

  // Step 3: Parse and validate
  let parsed;
  try {
    const cleaned = rawOutput.replace(/```json|```/g, "").trim();
    parsed = JSON.parse(cleaned);
  } catch (err) {
    console.error("Failed to parse Claude response as JSON:");
    console.error(rawOutput.substring(0, 500));
    process.exit(1);
  }

  if (!parsed.products || !parsed.services) {
    console.error('Response missing "products" or "services" key.');
    process.exit(1);
  }

  // Step 4: Basic IP leak check
  const ipPatterns = [
    /\$[\d,]+[KMB]?/gi,             // Dollar amounts
    /\d+%\s*CAGR/gi,                // Growth rates
    /34\s*CFR/gi,                    // Specific CFR citations
    /CFPB/gi,                       // Regulator names (too specific)
    /Ad\s*Astra|Coursedog|Ellucian|Nelnet|Transact|Flywire|TouchNet|CashNet|Othot|PowerFAIDS/gi,
    /Series\s*[A-C]/gi,             // Fundraising rounds
    /seed\s*(round|fundraise)/gi,
    /ARR/gi,                        // Revenue metrics
    /months?\s*\d+[-–]\d+/gi,      // Roadmap timelines
  ];

  const jsonString = JSON.stringify(parsed);
  const leaks = ipPatterns.filter((p) => p.test(jsonString));
  if (leaks.length > 0) {
    console.warn("⚠️  Potential IP leaks detected in output:");
    leaks.forEach((p) => {
      const matches = jsonString.match(p);
      console.warn(`   Pattern ${p}: found "${matches?.[0]}"`);
    });
    if (!dryRun) {
      console.error("Aborting write. Review the output or use --dry-run to inspect.");
      process.exit(1);
    }
  }

  // Step 5: Write files
  if (dryRun) {
    console.log("\n--- DRY RUN: products.json ---");
    console.log(JSON.stringify(parsed.products, null, 2).substring(0, 2000));
    console.log("\n--- DRY RUN: services.json ---");
    console.log(JSON.stringify(parsed.services, null, 2).substring(0, 2000));
    console.log("\nDry run complete. No files written.");
    return;
  }

  // Ensure _data directory exists
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const productsPath = path.join(DATA_DIR, "products.json");
  const servicesPath = path.join(DATA_DIR, "services.json");

  fs.writeFileSync(productsPath, JSON.stringify(parsed.products, null, 2) + "\n");
  console.log(`Wrote ${productsPath}`);

  fs.writeFileSync(servicesPath, JSON.stringify(parsed.services, null, 2) + "\n");
  console.log(`Wrote ${servicesPath}`);

  // Step 6: Optional git commit and push
  if (autoCommit) {
    console.log("Committing and pushing...");
    try {
      execSync(`git add ${productsPath} ${servicesPath}`, { stdio: "inherit" });
      execSync(
        `git commit -m "content: update products and services from overview doc"`,
        { stdio: "inherit" }
      );
      execSync("git push", { stdio: "inherit" });
      console.log("Pushed to remote. GitHub Pages deploy should trigger automatically.");
    } catch (err) {
      console.error("Git operations failed:", err.message);
      process.exit(1);
    }
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
