---
layout: layouts/article.njk
researchItem: true
title: "Measuring Curriculum–Labor Market Alignment in Vocational Education with NLP"
seoTitle: "Aligning Vocational Curricula to Labor Demand with NLP"
description: "An NLP pipeline using TF-IDF feature fusion to measure how well California vocational program curricula align with employer job postings — and where they fall short."
summary: "A semantic information-retrieval pipeline that quantifies how closely vocational program curricula align with employer demand expressed in online job postings."
date: 2025-12-15
permalink: /research/curriculum-labor-market-alignment/
tags:
  - research
  - higher-education
  - nlp
  - data-science
keywords: "curriculum labor market alignment, vocational education NLP, skill extraction, TF-IDF feature fusion, semantic similarity, information retrieval, program-job matching, higher education data science"
authors: "Marco Siliezar"
repo: "https://github.com/meatloaf02/nlp-domain-alignment"
abstract: "A semantic information-retrieval pipeline that quantifies how closely vocational program curricula align with employer demand expressed in online job postings."
badge: "NLP"
badgeType: "startup"
---

[View the code on GitHub →](https://github.com/meatloaf02/nlp-domain-alignment)

## The question

Career-oriented colleges promise a fast, lower-cost path to employment — but most still verify that promise by hand, with administrators manually reading job postings and program catalogs. That process is slow, expensive, and impossible to run at scale. This study asks a measurable version of the question every workforce-focused institution faces: **how well do our program curricula actually match what employers are hiring for?**

## What I built

I built an end-to-end natural language processing pipeline that retrieves the most relevant job postings for a given vocational program description using text similarity. Roughly 1,000 California job postings from the Adzuna API were aligned against 131 scraped program descriptions across five California vocational institutions.

The retrieval engine compares several embedding strategies — TF-IDF, Word2Vec, Doc2Vec, and transformer sentence embeddings — and fuses lexical, character n-gram, and phrase-level signals through a late-fusion ranker combined with BM25 via reciprocal rank fusion. The winning configuration was a **TF-IDF feature-fusion model with Doc2Vec (PV-DM) embeddings**, which outperformed every simpler vectorization strategy.

## What I found

- **Healthcare programs align most tightly** with employer demand. Standardized clinical credentials use consistent terminology that maps cleanly onto job titles and required skills.
- **Technical and IT programs align more weakly**, because trade job ads use broader, brand-specific, and colloquial phrasing that diverges from catalog language.
- A subdomain test showed the model could distinguish *clinical* from *administrative* roles within healthcare — evidence that the pipeline captures real semantic granularity, not just surface domain labels.
- The core institutional takeaway: low alignment usually signals **under-specified program descriptions**, not genuinely irrelevant curricula. Programs that name concrete, skill-level competencies match the labor market; generic marketing copy does not.

## Why it matters for institutions

For provosts, deans, and institutional-research teams, this is a repeatable, automatable alternative to consultant-led curriculum audits. Alignment scores can drive annual program review, flag outdated learning outcomes, validate new credentials before launch, and feed labor-market dashboards — turning a manual, periodic exercise into a continuous signal. It also sits squarely in the same space PraxisIQ works in: connecting institutional data to student and workforce outcomes.

*Methods, full results, and reproduction instructions are documented in the [project repository](https://github.com/meatloaf02/nlp-domain-alignment).*
