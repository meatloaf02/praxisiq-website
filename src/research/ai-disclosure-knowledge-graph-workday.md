---
layout: layouts/article.njk
researchItem: true
title: "Modeling the Evolution of AI Language in Corporate Disclosures: A Workday Knowledge Graph"
seoTitle: "Tracking AI Language in SEC Filings with a Knowledge Graph"
description: "A longitudinal knowledge graph of Workday's 2015–2026 disclosures and an AI Intensity Index, tested as a predictive signal for next-quarter stock returns."
summary: "A single-firm longitudinal knowledge graph that tracks the evolution of AI-related language in Workday's disclosures and tests whether that language predicts returns."
date: 2026-03-10
permalink: /research/ai-disclosure-knowledge-graph/
tags:
  - research
  - knowledge-graphs
  - nlp
  - data-science
keywords: "knowledge graph, SEC filings NLP, AI intensity index, corporate disclosure analysis, enterprise SaaS, financial signal, Granger causality, AI washing, longitudinal text analysis"
authors: "Marco Siliezar"
repo: "https://github.com/meatloaf02/KG"
abstract: "A single-firm longitudinal knowledge graph that tracks the evolution of AI-related language in Workday's disclosures and tests whether that language predicts returns."
badge: "Knowledge Graphs"
badgeType: "enterprise"
---

[View the code on GitHub →](https://github.com/meatloaf02/KG)

## The question

Enterprise software firms have poured resources into AI, and executives describe it as a driver of higher margins and shareholder value. This study asks a sharper version: **has that value actually shown up — and can the way a company talks about AI in its disclosures predict its stock?** Workday, Inc. (NASDAQ: WDAY) serves as a longitudinal single-firm case study.

## What I built

I assembled a corpus of Workday-authored documents — SEC filings, investor-relations pages, earnings remarks, and corporate blogs from 2015 to 2026 — via a focused, robots-compliant web crawler, then deduplicated and stored them in a PostgreSQL database. From there I constructed a **knowledge graph** governed by a versioned "canonical analysis layer" that keeps one primary narrative document per filing event, ensuring temporal comparability across years.

The graph produces an **AI Intensity Index (AII)** — a quarterly measure of AI-related language density — which I fed into a logistic-regression model to test whether it adds predictive value for next-quarter returns over a price-only baseline.

## What I found

- The AII captures four distinct, statistically detectable eras of AI language, including an abrupt structural break in 2019-Q4 (confirmed by a Chow test) and a shift to generative-AI vocabulary in 2023-Q2 — two quarters after ChatGPT's launch, consistent with the SEC filing cycle.
- **The predictive result was inconclusive, and I report it honestly:** price-only features dominated, and adding AII did not improve accuracy. The headline 0.81 test accuracy of the baseline is fragile (validation AUC of 0, n = 16 test quarters).
- Granger causality offered the more interesting finding: evidence that **returns lead AII**, not the reverse — consistent with a *lagging disclosure narrative* where management describes AI more intensely after favorable quarters. This connects to the SEC's 2024 "AI washing" enforcement actions.

## Why it matters

The durable contribution isn't the trading signal — it's the **knowledge graph itself**, designed to answer questions like "what AI capabilities does this firm claim, where, and how often?" and "which risk topics are emerging?" The schema generalizes beyond a single company to any B2B SaaS firm, making it a reusable instrument for analysts, investors, and researchers studying enterprise AI strategy over time.

*Full methodology, the KG schema, and reproduction code are in the [project repository](https://github.com/meatloaf02/KG).*
