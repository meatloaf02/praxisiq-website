---
layout: layouts/base.njk
title: Research
seoTitle: "Research — Applied AI, NLP & Optimization for Higher Education"
description: "Applied research by Marco Siliezar on NLP, knowledge graphs, reinforcement learning, and optimization — with a focus on higher-education student and workforce outcomes."
permalink: /research/
keywords: "applied AI research, higher education data science, NLP, knowledge graphs, reinforcement learning, optimization, enrollment management"
templateEngineOverride: njk
---

<section class="page-header">
  <div class="container">
    <p class="tagline">Research</p>
    <h1 class="page-title">Research</h1>
    <p class="page-subtitle">I work at the intersection of applied machine learning and higher-education strategy — natural language processing, knowledge graphs, reinforcement learning, and optimization, applied to the problems institutions actually face: aligning curricula to the labor market, reading signal out of unstructured disclosure data, and allocating scarce resources like financial aid more effectively.</p>
    <p style="max-width: 760px; margin-top: 1.5rem; color: var(--n700);">The work below spans peer-reviewed-style empirical studies, a critical review of frontier research, and applied simulations. Several of these directly inform <a href="/products/">Allocate</a>, the higher-education optimization platform I'm building through PraxisIQ.</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="card-grid">
      {% for item in collections.research %}
        <a href="{{ item.url }}" class="card reveal" style="text-decoration: none;">
          {% if item.data.badge %}
            <span class="card-badge card-badge--{{ item.data.badgeType or 'enterprise' }}">{{ item.data.badge }}</span>
          {% endif %}
          <p class="text-muted" style="font-size: 0.8125rem; margin-bottom: 0.5rem;">{{ item.date | dateFormat }}</p>
          <h3>{{ item.data.title }}</h3>
          {% if item.data.venue %}
            <p class="text-muted" style="font-size: 0.875rem; margin-bottom: 0.75rem;">{{ item.data.venue }}</p>
          {% endif %}
          <p>{{ item.data.summary or item.data.abstract or item.data.description }}</p>
        </a>
      {% endfor %}
    </div>
  </div>
</section>
