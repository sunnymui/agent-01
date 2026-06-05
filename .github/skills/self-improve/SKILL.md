---
name: self-improve
description: >
  Analyze the current chat session for mistakes, corrections, fixes, and codebase learnings,
  then synthesize concise lessons into AGENTS.md as long-term rules and gotchas.
  Use when: session retrospective, capture learnings, add lessons to AGENTS.md, or capture mistakes.
argument-hint: 'Optional: scope to a specific topic or file'
---

# Self-Improve

Scan the current conversation for learnable moments, distill into rules, write to root `AGENTS.md`.

## Steps

**1. Spot signals** — user corrections, retried tool calls, clarified intent, repeated mistakes, codebase discoveries.

**2. Distill** — one rule per root cause (not per incident). One line, imperative tone (`always`/`never`/`prefer`). Codebase-specific beats generic. ≤5 rules total.

**3. Categorize** — `## Rules`, `## Gotchas`, `## Conventions`, or `## Lessons Learned`. Create heading if missing.

**4. Update** — read `AGENTS.md`, append under the right heading, skip semantic duplicates, never remove existing rules.

**5. Confirm** — output `Added N rules: [list]`. If nothing found, say so — do not invent rules.
