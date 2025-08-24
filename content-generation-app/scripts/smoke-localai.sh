#!/usr/bin/env bash
set -euo pipefail

# Smoke test: bring up LocalAI, start next dev, call the generate endpoint, and print result.
# Usage: ./scripts/smoke-localai.sh

ROOT_DIR=$(cd "$(dirname "$0")/.." && pwd)
cd "$ROOT_DIR"

LOCALAI_KEY=${LOCALAI_API_KEY:-localai}
LOCALAI_BASE=${LOCALAI_API_BASE:-http://localhost:8080}
APP_PORT=${APP_PORT:-3000}

echo "Starting LocalAI via docker compose..."
LOCALAI_API_KEY=$LOCALAI_KEY docker compose up -d

echo "Waiting for LocalAI to accept connections at $LOCALAI_BASE..."
for i in {1..30}; do
  if curl -s "$LOCALAI_BASE/health" | grep -q "ok"; then
    echo "LocalAI is up"
    break
  fi
  sleep 1
done

if ! curl -s "$LOCALAI_BASE/health" | grep -q "ok"; then
  echo "LocalAI did not become healthy; aborting." >&2
  exit 1
fi

echo "Starting Next dev in background..."
OPENAI_API_KEY=$LOCALAI_KEY OPENAI_API_BASE=$LOCALAI_BASE pnpm dev &
NEXT_PID=$!

echo "Waiting for Next to be available on http://localhost:$APP_PORT..."
for i in {1..30}; do
  if curl -s "http://localhost:$APP_PORT/_next/static/" >/dev/null 2>&1; then
    echo "Next is up"
    break
  fi
  sleep 1
done

echo "Calling generation endpoint..."
RESP=$(curl -s -X POST "http://localhost:$APP_PORT/api/generate-content" \
  -H "Content-Type: application/json" \
  -d '{"category":"templates","mode":"smart","context":"Smoke test: Acme"}')

echo "Response:"
echo "$RESP" | jq || echo "$RESP"

echo "Cleaning up..."
kill $NEXT_PID || true
docker compose down

echo "Done"
