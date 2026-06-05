---
name: parallel-code-review
description: >
  Run a parallel, multi-dimensional code review by spawning 5 specialist subagents
  (security, quality, logic, performance, tests) and synthesizing their findings into
  a single structured report.
  Use when: reviewing staged or unstaged changes, PR review, code review, review my changes,
  review this diff, check my code.
---

# Parallel Code Review

Orchestrates a thorough, multi-dimensional review by delegating to 5 specialist subagents in parallel, then synthesizing findings into a single authoritative report.

## Resources

**Dimension references:**
- `references/security.md` — Security focus areas, severity scale, output format
- `references/quality.md` — Code quality focus areas, severity scale, output format
- `references/logic.md` — Logic & correctness focus areas, severity scale, output format
- `references/performance.md` — Performance focus areas, severity scale, output format
- `references/tests.md` — Tests & coverage focus areas, severity scale, output format

## Workflow

### Step 1 — Collect the Diff

Run the following commands to gather all current changes:

```bash
git diff HEAD
git diff --cached
```

If both are empty, inform the user there are no changes to review and stop.

Combine into a single `DIFF` string. Note which files are changed.

### Step 2 — Load Dimension References

Read all 5 files in `references/` to load each specialist's focus areas, severity scale, and required output format before spawning subagents.

### Step 3 — Spawn 5 Parallel Subagents

Delegate to each of the following specialist subagents **in parallel**, passing the full diff and the corresponding reference content as context.

| # | Subagent name | Reference file | Focus |
|---|---------------|----------------|-------|
| 1 | `code-review-security` | `references/security.md` | Security vulnerabilities, secrets, injection, auth |
| 2 | `code-review-quality` | `references/quality.md` | Code quality, style, complexity, naming, DRY |
| 3 | `code-review-logic` | `references/logic.md` | Logic correctness, bugs, edge cases, error handling |
| 4 | `code-review-performance` | `references/performance.md` | Performance, bottlenecks, memory, unnecessary ops |
| 5 | `code-review-tests` | `references/tests.md` | Test coverage, test quality, missing tests |

Prompt each subagent with the following template, substituting the relevant reference content and the diff:

> You are a [SPECIALTY] code reviewer. Follow the focus areas, severity scale, and output format defined below.
>
> [PASTE FULL REFERENCE FILE CONTENT HERE]
>
> Review the following diff:
>
> ```diff
> {DIFF}
> ```

### Step 4 — Collect Reports

Wait for all 5 subagents to return their reports.

### Step 5 — Synthesize Final Report

Actively synthesize, de-duplicate, and prioritize across all 5 reports into the Final Report Format below. Do NOT just append the subagent reports.

## Final Report Format

Output exactly this structure:

---

# Code Review Report

**Scope**: {list of changed files}
**Date**: {today's date}
**Dimensions reviewed**: Security · Quality · Logic · Performance · Tests

---

## Executive Summary

{2-4 sentence verdict: overall health, most important issues, whether changes are safe to merge.}

**Verdict**: `APPROVE` | `REQUEST CHANGES` | `BLOCK`

> - `APPROVE` — no critical or high-severity issues
> - `REQUEST CHANGES` — high-severity issues that must be addressed before merge
> - `BLOCK` — critical issues (security vulnerabilities, data loss risk, broken logic)

---

## Critical Issues 🔴 *(must fix before merge)*

{Table or "None found." if clean}

| # | Dimension | File | Issue | Recommendation |
|---|-----------|------|-------|----------------|

---

## Warnings 🟡 *(should fix)*

| # | Dimension | File | Issue | Recommendation |
|---|-----------|------|-------|----------------|

---

## Suggestions 🔵 *(nice to have)*

| # | Dimension | File | Issue | Recommendation |
|---|-----------|------|-------|----------------|

---

## Review by Dimension

{Paste each subagent's full report block here, in order: Security, Quality, Logic, Performance, Tests}
