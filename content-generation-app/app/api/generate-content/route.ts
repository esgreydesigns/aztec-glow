import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { category, prompt, mode, context } = await request.json()

    let systemPrompt = ""
    let userPrompt = ""

    const categoryPrompts = {
      templates:
        "Create professional document templates, forms, or layouts that are immediately usable and customizable.",
      images:
        "Generate detailed descriptions for AI image generation, including style, composition, colors, and technical specifications.",
      videos:
        "Create video scripts, storyboards, or content outlines with scene descriptions, dialogue, and production notes.",
      puzzles:
        "Design engaging brain teasers, logic puzzles, or problem-solving challenges with solutions and difficulty levels.",
      quizzes:
        "Build comprehensive quizzes with questions, multiple choice answers, explanations, and scoring systems.",
      games: "Create game concepts, rules, mechanics, or simple interactive experiences with clear instructions.",
      code: "Generate functional code scripts, utilities, or tools with documentation, comments, and usage examples.",
      audio: "Create audio content scripts, podcast outlines, music composition guides, or sound effect descriptions.",
      ebooks:
        "Write comprehensive guides, stories, or instructional content with chapters, sections, and actionable insights.",
      designs: "Create design specifications, UI/UX guidelines, branding elements, or visual asset descriptions.",
      courses: "Develop structured learning materials with lessons, exercises, assessments, and learning objectives.",
      automation: "Build automation workflows, scripts, or bot configurations with step-by-step implementation guides.",
    }

    if (mode === "smart") {
      systemPrompt = `You are an expert at creating valuable digital content in the ${category} category. Generate complete, ready-to-use content that provides immediate value and solves real problems. Focus on quality, practicality, and professional presentation.`

      userPrompt = `Generate a high-quality ${category} product that would be worth purchasing. 

${categoryPrompts[category as keyof typeof categoryPrompts] || "Create valuable content in this category."}

${context ? `Additional context: ${context}` : "Use current market trends and best practices."}

Make it comprehensive, professional, and immediately actionable. Include clear structure, detailed content, and practical value.`
    } else {
      systemPrompt = `You are an expert content creator specializing in ${category}. Create comprehensive, professional content that provides immediate value and meets the specific requirements provided.`

      userPrompt = `Create ${category} content based on these requirements:

${prompt}

${categoryPrompts[category as keyof typeof categoryPrompts] || "Create valuable content in this category."}

Make it complete, professional, and immediately actionable with clear structure and practical implementation details.`
    }

    // Check common provider env vars and support LocalAI/Gemini mapping.
    const providerEnvVars = [
      "AI_API_KEY",
      "VERCEL_AI_TOKEN",
      "VERCEL_OIDC_TOKEN",
      "GEMINI_API_KEY",
      "LOCALAI_API_KEY",
    ]

    // If the user provided a Gemini key, map it to AI_API_KEY for compatibility.
    if (process.env.GEMINI_API_KEY) {
      process.env.AI_API_KEY = process.env.AI_API_KEY || process.env.GEMINI_API_KEY
    }

    // If LocalAI is configured, default LOCALAI_API_BASE to the local address
    // and map the LocalAI key to AI_API_KEY for compatibility.
    if (process.env.LOCALAI_API_KEY) {
      process.env.LOCALAI_API_BASE = process.env.LOCALAI_API_BASE || "http://localhost:8080"
      process.env.AI_API_KEY = process.env.AI_API_KEY || process.env.LOCALAI_API_KEY
    }

  const hasCredential = providerEnvVars.some((name) => Boolean(process.env[name])) || Boolean(process.env.LOCALAI_API_BASE)

    if (!hasCredential) {
      return NextResponse.json(
        {
          error:
            "Missing AI provider configuration. For LocalAI set LOCALAI_API_KEY and LOCALAI_API_BASE=http://localhost:8080 (or set GEMINI_API_KEY for Gemini). See .env.example.",
          success: false,
        },
        { status: 400 }
      )
    }

  // Allow overriding the model selector via env var (set AI_MODEL_GROQ to a groq model selector string).
  const modelSelector = process.env.AI_MODEL_GROQ ? groq(process.env.AI_MODEL_GROQ) : groq("llama-3.3-70b-versatile")

    const { text } = await generateText({
      model: modelSelector,
      system: systemPrompt,
      prompt: userPrompt,
      maxOutputTokens: 4000,
    })

    return NextResponse.json({
      content: text,
      success: true,
      prompt: mode === "smart" ? `Smart-generated ${category} content` : prompt,
    })
  } catch (error) {
    console.error("Content generation error:", error)
    return NextResponse.json({ error: "Failed to generate content", success: false }, { status: 500 })
  }
}
