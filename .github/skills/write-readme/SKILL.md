---
name: write-readme
description: >
  Write or update a README.md for the current repository.
  Use when the user asks to create a readme, generate documentation, write a README,
  document this project, or update the README.
argument-hint: 'Optional: specify sections to include or a custom title'
---

# Write README

Generate a high-quality README.md for the current repository by analyzing its structure, code, and existing documentation.

## Procedure

### 1. Gather Repo Info

Run the info-gathering script to collect key metadata:

```bash
bash .github/skills/write-readme/scripts/gather_repo_info.sh
```

Also read these files if they exist:
- `package.json` / `pyproject.toml` / `Cargo.toml` / `go.mod` — name, description, version, scripts, dependencies
- Any existing `README.md` — preserve intent, update content
- Entry point files (`index.js`, `main.py`, `server.js`, `app.*`) — understand what the project does
- `AGENTS.md` / `CLAUDE.md` — architectural context

### 2. Analyze & Identify

Determine:
- **Project type**: web app, CLI, library, API, etc.
- **Tech stack**: language, framework, key dependencies
- **Entry points**: how to run/start the project
- **Available scripts**: `npm run`, `make`, `cargo`, etc.
- **Configuration**: env vars, config files
- **Tests**: how to run them

### 3. Write the README

Use [readme-template.md](./references/readme-template.md) as the structural guide.

Tailor the content:
- Lead with a 1–2 sentence description of what the project does and why
- Include only sections that are relevant (skip empty sections)
- Use real values from the codebase (actual script names, real commands)
- Keep installation/usage commands copy-pasteable and accurate

**Reference materials by situation:**

| Situation | Load |
|-----------|------|
| Unsure what a good README looks like, or want inspiration for structure/elements | [readme-examples.md](./references/readme-examples.md) |
| Project has complex system design, multiple services, or non-obvious architecture | [architecture-examples.md](./references/architecture-examples.md) |
| User wants dynamic badges, GIFs, stats cards, or automated README generation tools | [tools-and-resources.md](./references/tools-and-resources.md) |
| User asks about README best practices, philosophy, or wants to understand the "why" | [articles.md](./references/articles.md) |

### 4. Output

Write the README to `README.md` at the project root. If one already exists, ask whether to overwrite or update specific sections.

## Quality Checklist

- [ ] Title matches project name
- [ ] Description answers "what does this do?"
- [ ] Install and run steps are accurate and tested
- [ ] No placeholder text remains
- [ ] Sections with no content are removed
