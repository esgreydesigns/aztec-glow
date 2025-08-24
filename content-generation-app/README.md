# content-generation-app

This is the Next.js content generation frontend that includes an API route at `app/api/generate-content/route.ts` which uses the `ai` SDK to generate content.

Quick start

1. Install dependencies (pnpm recommended):

```bash
cd content-generation-app
pnpm install
```

2. Run in development (will use a local mock if no provider key is set):

```bash
# use the mock generator (no provider key required)
DEV_AI_MOCK=1 pnpm dev
```

3. Build for production (requires a provider key):

```bash
pnpm build
pnpm start
```

Environment variables

- AI_API_KEY - (optional) Generic AI SDK key
- VERCEL_AI_TOKEN / VERCEL_OIDC_TOKEN - (optional) Vercel AI gateway tokens
- DEV_AI_MOCK=1 - (optional) Use a local mock response instead of calling an AI provider

Gemini (Google) key

If you have a Gemini key, set `GEMINI_API_KEY` in your environment. The server will map
that to `AI_API_KEY` at runtime so the `ai` SDK can pick it up.

Model override

You can change which model selector the route uses by setting `AI_MODEL_GROQ` to a GROQ
model selector string. Example: `AI_MODEL_GROQ=llama-3.3-70b-versatile` (this is the default).

If you don't want to provide a real AI provider during development, use `DEV_AI_MOCK=1` when running `pnpm dev` to avoid needing API credentials.

Running a local LLM with LocalAI

You can run a local LLM using LocalAI (loads GGML/ggml-compatible models). This is useful when you don't want to use a hosted provider.

1. Add your model files into `content-generation-app/models` (e.g. a ggml model file).
2. Start LocalAI with Docker Compose:

```bash
cd content-generation-app
LOCALAI_API_KEY=localai docker-compose up -d
```

3. Point the app at LocalAI. Example env vars (see `.env.example`):

```bash
LOCALAI_API_KEY=localai
LOCALAI_API_BASE=http://localhost:8080
pnpm dev
```

Notes:
- The `docker-compose.yml` provided in this folder runs LocalAI on port 8080 and mounts `./models` into the container. Learn more at https://github.com/go-skynet/LocalAI.
- Model performance depends on the model file, hardware, and CPU/GPU support.
