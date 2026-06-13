---
layout: layouts/article.njk
researchItem: true
title: "Peer Review — Multi-Agent Digital Twins for Strategic Decision-Making Using Active Inference"
seoTitle: "Review: Multi-Agent Digital Twins & Active Inference"
description: "A critical peer review of multi-agent digital twins built on active inference and expected free energy — assessing coordination, streaming learning, and compute cost at scale."
summary: "A critical review of Mancinelli et al. (2026) on multi-agent digital twins using active inference, weighing its contribution to agent coordination against computational cost."
date: 2026-04-05
permalink: /research/multi-agent-digital-twins-review/
tags:
  - research
  - reinforcement-learning
  - peer-review
keywords: "active inference, digital twins, multi-agent systems, expected free energy, reinforcement learning, decentralized generative models, streaming machine learning, agent coordination"
authors: "Marco Siliezar"
abstract: "A critical review of Mancinelli et al. (2026) on multi-agent digital twins using active inference, weighing its contribution to agent coordination against computational cost."
badge: "Peer Review"
badgeType: "startup"
---

A critical review of **Mancinelli et al. (2026)**, *"Multi-Agent Digital Twins for Strategic Decision-Making using Active Inference"* ([arXiv:2604.12657](https://arxiv.org/abs/2604.12657)), which extends prior active-inference digital-twin work by Torzoni et al. (2026) to multiple coordinating agents.

## What the paper proposes

The authors give digital twins a **decentralized generative model** so that multiple agents can detect shared environmental changes and adapt to them while maintaining goal-oriented behavior. The central mechanism is the **expected free energy (EFE)**, which scores the consequences of future actions under admissible policies before they are taken — explicitly balancing exploration (epistemic actions) against exploitation (pragmatic ones) in high-uncertainty environments.

## What works

- The EFE formulation is the paper's strongest contribution: a principled way to evaluate policies as they reveal themselves over time, naturally driving agents to gather information first and act decisively second.
- Integrating the framework with **streaming machine learning** lets agents update their preferences over outcomes online, as new information enters the environment — a meaningful step for non-stationary, multi-agent settings.

## Where I push back

- **Computational overhead at scale.** Evaluating EFE across every admissible, time-varying policy becomes expensive as the policy space grows. In complex digital-twin environments this combinatorial cost may be uncontrollable.
- **Coordination lag and noise.** The authors' own three-firm experiment shows downstream firms only learn the environment changed *after* the preceding firm analyzes it. Because opponent-firm actions aren't modeled, they effectively become noise — and more agents means more noise to process before each action, compounding compute cost.
- **No discussion of limitations or future work.** The paper doesn't address scaling, unresolved questions, or how the framework adapts to broader problems, and some figures (e.g., the three-firm results placed in the discussion) are positioned out of context.

## Why this is in my portfolio

Active inference, EFE, and decentralized multi-agent coordination are directly adjacent to the reinforcement-learning and sequential-decision methods I work with in applied settings. Reviewing frontier work like this — and being specific about where elegant theory meets practical compute limits — is part of how I evaluate which techniques are ready for real deployment versus which remain research-stage.
