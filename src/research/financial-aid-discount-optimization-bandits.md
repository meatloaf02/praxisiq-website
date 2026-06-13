---
layout: layouts/article.njk
researchItem: true
title: "Optimizing Institutional Financial Aid Discount Rates with Contextual Multi-Armed Bandits"
seoTitle: "Optimizing Financial Aid Discounts with Contextual Bandits"
description: "A contextual multi-armed bandit simulation that learns revenue-optimal tuition discount rates by student segment — showing why yield-maximizing is not revenue-maximizing."
summary: "A contextual multi-armed bandit that learns the revenue-optimal institutional aid discount per student segment, demonstrating that the yield-maximizing discount is not the revenue-maximizing one."
date: 2026-05-01
permalink: /research/financial-aid-discount-optimization/
tags:
  - research
  - reinforcement-learning
  - higher-education
  - enrollment-management
keywords: "financial aid optimization, tuition discount rate, enrollment management, contextual multi-armed bandit, Thompson sampling, net tuition revenue, yield optimization, higher education analytics"
authors: "Marco Siliezar"
abstract: "A contextual multi-armed bandit that learns the revenue-optimal institutional aid discount per student segment, demonstrating that the yield-maximizing discount is not the revenue-maximizing one."
badge: "Optimization"
badgeType: "edu"
---

A simulation study modeling a tuition-dependent institution that uses **contextual multi-armed bandits** to learn the optimal institutional aid discount to offer admitted students.

## The core tension

Higher discounts increase the probability a student enrolls — but reduce net tuition per enrolled student. So the **revenue-maximizing discount is not the yield-maximizing discount**, and the right answer differs by student segment. That makes aid packaging a genuine sequential optimization problem, not a fixed-rate policy.

## What I modeled

I simulated 5,000 admitted students across three segments — High-Need, Merit-Focused, and Low-Need — each with its own logistic enrollment-response curve. The "arms" are discount rates from 20% to 60%; the reward for an offer is a Bernoulli enrollment draw times net tuition. I then pitted three bandit algorithms against each other in both contextual (per-segment) and non-contextual forms:

- **ε-Greedy**
- **UCB1**
- **Thompson Sampling**

## What I found

- **Thompson Sampling (contextual)** achieved the lowest cumulative regret, converging most reliably to the per-segment optimal arm — its Bayesian posterior tunes its own exploration without manual hyperparameters. UCB1 was a close second; ε-Greedy lagged because it never stops exploring.
- **Context matters more than algorithm choice.** The gap between contextual and non-contextual versions of the *same* algorithm was larger than the gap *between* algorithms. Accurate segment identification yields more revenue than fine-tuning exploration parameters.
- **Yield ≠ revenue.** The 60% discount maximized enrollment for every segment but maximized revenue for none. Institutions chasing raw yield metrics will systematically over-discount.
- Early exploration has a real cost — roughly the first ~500 admits — but every contextual bandit recouped it comfortably by 5,000 admits versus a naive fixed-discount strategy.

## Why it matters

This is the financial-aid optimization problem at the heart of enrollment management, made tractable. It also previews the optimization thesis behind **Allocate**, the higher-education platform I'm building through PraxisIQ: treat institutional aid as a portfolio-allocation problem and optimize across the student body within budget and compliance constraints, rather than applying static merit-and-need rules. The notebook is explicit about the assumptions a production system must revisit — i.i.d. arrivals, perfectly observed segments, no capacity constraints, and the ethics of differential pricing by inferred need.

*The full simulation, enrollment-response model, and algorithm implementations are in the accompanying notebook.*
