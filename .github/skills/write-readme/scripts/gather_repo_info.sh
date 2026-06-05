#!/usr/bin/env bash
# gather_repo_info.sh — Extract key metadata from a repository
# Usage: bash gather_repo_info.sh [/path/to/repo]
# Outputs structured info to stdout for use by the write-readme skill

REPO="${1:-.}"
cd "$REPO" || exit 1

echo "=== REPO ROOT: $(pwd) ==="
echo ""

# ── File structure (top-level, 2 levels deep) ──────────────────────────────
echo "=== STRUCTURE ==="
find . -maxdepth 2 \
  -not -path '*/node_modules/*' \
  -not -path '*/.git/*' \
  -not -path '*/__pycache__/*' \
  -not -path '*/.next/*' \
  -not -path '*/dist/*' \
  -not -path '*/build/*' \
  -not -name '.DS_Store' \
  | sort
echo ""

# ── Node / npm ─────────────────────────────────────────────────────────────
if [ -f package.json ]; then
  echo "=== PACKAGE.JSON ==="
  cat package.json
  echo ""
fi

# ── Python ─────────────────────────────────────────────────────────────────
if [ -f pyproject.toml ]; then
  echo "=== PYPROJECT.TOML ==="
  cat pyproject.toml
  echo ""
elif [ -f setup.py ]; then
  echo "=== SETUP.PY ==="
  head -40 setup.py
  echo ""
fi

if [ -f requirements.txt ]; then
  echo "=== REQUIREMENTS.TXT ==="
  cat requirements.txt
  echo ""
fi

# ── Rust ───────────────────────────────────────────────────────────────────
if [ -f Cargo.toml ]; then
  echo "=== CARGO.TOML ==="
  cat Cargo.toml
  echo ""
fi

# ── Go ─────────────────────────────────────────────────────────────────────
if [ -f go.mod ]; then
  echo "=== GO.MOD ==="
  cat go.mod
  echo ""
fi

# ── Makefile targets ───────────────────────────────────────────────────────
if [ -f Makefile ]; then
  echo "=== MAKEFILE TARGETS ==="
  grep -E '^[a-zA-Z0-9_-]+:' Makefile | sed 's/:.*//'
  echo ""
fi

# ── Env example ───────────────────────────────────────────────────────────
for f in .env.example .env.sample .env.template; do
  if [ -f "$f" ]; then
    echo "=== ENV TEMPLATE ($f) ==="
    cat "$f"
    echo ""
    break
  fi
done

# ── Docker ─────────────────────────────────────────────────────────────────
if [ -f Dockerfile ]; then
  echo "=== DOCKERFILE ==="
  cat Dockerfile
  echo ""
fi

if [ -f docker-compose.yml ] || [ -f docker-compose.yaml ]; then
  echo "=== DOCKER-COMPOSE ==="
  cat docker-compose.yml 2>/dev/null || cat docker-compose.yaml
  echo ""
fi

# ── Existing README ────────────────────────────────────────────────────────
if [ -f README.md ]; then
  echo "=== EXISTING README.MD ==="
  cat README.md
  echo ""
fi

echo "=== DONE ==="
