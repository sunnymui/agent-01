# agent-01

A demo repository showcasing agentic AI patterns and techniques implemented as VS Code Copilot custom agents and skills. Each agent and skill demonstrates a specific architectural pattern — from reflection loops to multi-agent orchestration — that you can study, remix, and apply to your own projects.

> **⚠️ A note on complexity:** All of these patterns increase token usage and add architectural overhead. Before reaching for a complex pattern, ask yourself whether the extra architecture is actually worth it for your use case. A simple single-agent prompt often gets the job done. Scale up only when you have a clear reason.

---

## Running the To Do App

This is just a simple todo app, just to have something for the agents to work with when you experiment with them.

```bash
npm install
npm run dev
```

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |

**Stack:** React 18, Vite 5

---

## Agents

Agents live in [.github/agents/](.github/agents/). Each `.agent.md` file defines a named agent mode in VS Code Copilot.

### Reflection Patterns

Reflection is the pattern of asking an agent to generate output, critique its own output, then revise based on that critique. It tends to improve output quality at the cost of more tokens and latency.

#### `Self-Reflect` — [self-reflect.agent.md](.github/agents/self-reflect.agent.md)
A single-pass reflection loop: **Draft → Critique → Revised Output**. Good for writing tasks, code review, design decisions, and any task that benefits from a second look. The agent only shows you the final revised output.

#### `Ultra Self-Reflect` — [ultra-self-reflect.agent.md](.github/agents/ultra-self-reflect.agent.md)
Reflection taken to the extreme: runs **exactly 5 revision loops** before outputting anything. Based on a technique by Steven Yegge (of Gastown/vibe coding fame) — the idea being that a model iterating on its own output will converge on a more stable, higher-quality answer. Use for complex code, architecture decisions, or anything where quality matters more than speed. All 5 loops run internally in the model's reasoning before any output is shown.

#### `External Reflect` — [external-reflect.agent.md](.github/agents/external-reflect.agent.md)
Reflection with external grounding: **Draft → Fetch Web Sources → Critique & Revise**. The agent validates its draft against at least 2 authoritative external sources before producing a final answer. Best for questions about current technologies, APIs, trends, or best practices where the model's training data may be stale.

---

### ReAct Agent Loop

#### `ReAct` — [react.agent.md](.github/agents/react.agent.md)
Implements the **ReAct (Reasoning + Acting)** pattern: a strict **Thought → Action → Observation** loop that repeats until the task is fully resolved. The agent must reason before every action and may never guess when a tool can find out. Parallelizes independent tool calls within a single step. Ideal for multi-step research, debugging, code exploration, and any fact-finding task that requires iterative tool use.

---

### Multi-Agent Patterns

These agents coordinate multiple specialized sub-agents to handle complex tasks.

#### `Parallel Code Review` — [parallel-code-review.agent.md](.github/agents/parallel-code-review.agent.md)
Demonstrates three patterns at once:

- **Parallelization** — spawns 5 specialist subagents simultaneously, each analyzing the diff from a different angle
- **Router** — routes work to the right specialist (security, quality, logic, performance, tests)
- **Orchestrator** — collects all 5 reports and synthesizes them into a single de-duplicated, prioritized final report

The 5 specialist subagents ([code-review-security](.github/agents/code-review-security.agent.md), [code-review-quality](.github/agents/code-review-quality.agent.md), [code-review-logic](.github/agents/code-review-logic.agent.md), [code-review-performance](.github/agents/code-review-performance.agent.md), [code-review-tests](.github/agents/code-review-tests.agent.md)) are designed to be called by the orchestrator but can also be invoked directly.

#### `Task Decomposer Orchestrator` — [task-decomposer-orchestrator.agent.md](.github/agents/task-decomposer-orchestrator.agent.md)
Demonstrates the **task decomposition** and **orchestrator** patterns. Given a high-level goal, the agent decides whether decomposition is even warranted (simple tasks are done directly), then breaks the goal into typed subtasks (`[RESEARCH]`, `[IMPLEMENT]`, `[REVIEW]`), delegates each to a specialist subagent ([task-researcher](.github/agents/task-researcher.agent.md), [task-implementer](.github/agents/task-implementer.agent.md), [task-reviewer](.github/agents/task-reviewer.agent.md)), and synthesizes all outputs into a unified result.

#### `Test Analysis` — [test-analysis.agent.md](.github/agents/test-analysis.agent.md)
Demonstrates the **sequential / handoff** pattern. The agent analyzes the codebase for test coverage gaps and produces a structured test plan, then hands off that plan to the [Test Implementer](.github/agents/test-implementer.agent.md), which writes the tests and passes results to the [Test Validator](.github/agents/test-validator.agent.md). Each agent in the chain receives the structured output of the previous one as its input.

---

## Skills

Skills live in [.github/skills/](.github/skills/). They are invoked via `#prompt:SKILL.md` in chat and contain procedural instructions for specific tasks.

### `write-readme` — [.github/skills/write-readme/](.github/skills/write-readme/)
Generates a high-quality README by gathering repo metadata, analyzing the codebase, and writing structured documentation. Demonstrates the **progressive disclosure** principle: the main `SKILL.md` is concise, with detailed reference material (`readme-template.md`, `readme-examples.md`, `architecture-examples.md`, etc.) broken out into separate files that are only loaded when relevant. This keeps the primary context window lean.

### `self-improve` — [.github/skills/self-improve/](.github/skills/self-improve/)
A minimal implementation of **agent memory and self-improvement feedback loops**. After a session, this skill scans the conversation for mistakes, corrections, and learnings, distills them into rules (max 5 per run), and appends them to `AGENTS.md`. Over time, the agent accumulates codebase-specific knowledge that persists across sessions.

### `parallel-code-review` — [.github/skills/parallel-code-review/](.github/skills/parallel-code-review/)
An alternative implementation of the parallel code review pattern using a skill rather than a dedicated agent. Illustrates how the same pattern can be expressed through progressive disclosure: the skill's main file orchestrates the workflow and references per-dimension detail files (`references/security.md`, `references/quality.md`, etc.) that are loaded only when needed.

### `intent-layer` — [.github/skills/intent-layer/](.github/skills/intent-layer/)
Creates a hierarchical `AGENTS.md` infrastructure across your codebase as a **context engineering technique**. The idea: place `AGENTS.md` files at the root and in each major subdirectory, forming a hierarchical knowledge graph that agents can traverse as they navigate the codebase. A root node points to child nodes; agents read the relevant node for the part of the codebase they're working in. This is similar to a hierarchical knowledge graph embedded directly in your repo. Learn more at [intent-systems.com/blog/intent-layer](https://intent-systems.com/blog/intent-layer).

---

## Applying These Patterns: Agent Harness Engineering

The patterns in this repo aren't just about prompting — they're building blocks for an **agent harness**: the layer of tooling and practices that sits around an AI model and shapes how it behaves.

This is why you can get meaningfully different results from the same underlying model (say, Claude Sonnet) depending on whether you're using Claude Code, VS Code Copilot, OpenCode, or Cursor. The model weights are identical. What differs is the harness — the system prompt, the tools exposed, the feedback loops, the constraints, and the context engineering layered on top.

A well-designed harness has four responsibilities:

| Responsibility | What it means | Examples from this repo |
|----------------|--------------|------------------------|
| **Constrain** | Limit what the agent can do | Agent tool declarations (`tools: [read, search]`), VS Code agent mode boundaries |
| **Inform** | Give the agent the right context to act well | `intent-layer` skill (hierarchical AGENTS.md), `write-readme` progressive disclosure, `AGENTS.md` at root |
| **Verify** | Check that the agent did it correctly | `Test Validator` agent, CI linting, the critique phase in reflection agents |
| **Correct** | Feed failures back to improve future behavior | `self-improve` skill (appends lessons to AGENTS.md), reflection loops (self-critique → revision) |

The patterns here map directly onto harness engineering:

- **Reflection agents** implement the Verify + Correct cycle within a single response — the agent critiques its own output and self-corrects before you ever see it.
- **ReAct** implements a grounded Inform loop — the agent must observe real tool output before acting, preventing hallucinated reasoning.
- **Orchestrator / decomposition agents** implement Constrain — each subagent only sees and does what it's scoped to.
- **Sequential / handoff agents** (test pipeline) implement Verify + Correct across agents — the validator can route back to the implementer when tests fail.
- **`intent-layer`** and **`self-improve`** are persistent Inform and Correct mechanisms that improve the harness itself over time.

The takeaway: the patterns here aren't exotic. They're ways of systematically building the four harness properties into your agent workflows — whether that's a single-agent chat loop or a multi-agent pipeline.

---

## Pattern Reference

| Pattern | Where it's demonstrated |
|---------|------------------------|
| Reflection | `Self-Reflect`, `Ultra Self-Reflect`, `External Reflect` |
| ReAct loop | `ReAct` |
| Parallelization | `Parallel Code Review` (agent + skill) |
| Router | `Parallel Code Review` |
| Orchestrator | `Parallel Code Review`, `Task Decomposer Orchestrator` |
| Task decomposition | `Task Decomposer Orchestrator` |
| Sequential / handoff | `Test Analysis → Test Implementer → Test Validator` |
| Progressive disclosure | `write-readme` skill, `parallel-code-review` skill |
| Agent memory / self-improvement | `self-improve` skill |
| Context engineering (intent layer) | `intent-layer` skill |
