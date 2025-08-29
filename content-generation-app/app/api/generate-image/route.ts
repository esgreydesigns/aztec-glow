import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { prompt, size = "1024x1024", style = "vivid" } = await request.json()

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      )
    }

    if (!process.env.STABILITY_API_KEY) {
      return NextResponse.json(
        { error: "Stability AI API key not configured. Please set STABILITY_API_KEY environment variable." },
        { status: 500 }
      )
    }

    // Map size to Stability AI format
    const sizeMap: { [key: string]: { width: number; height: number } } = {
      "1024x1024": { width: 1024, height: 1024 },
      "1792x1024": { width: 1792, height: 1024 },
      "1024x1792": { width: 1024, height: 1792 },
      "512x512": { width: 512, height: 512 },
      "768x768": { width: 768, height: 768 },
    }

    const dimensions = sizeMap[size] || sizeMap["1024x1024"]

    // Prepare the request for Stability AI
    const stabilityPrompt = `${prompt}${style === "vivid" ? ", vibrant colors, high contrast, dramatic lighting" : ", natural colors, soft lighting, realistic"}`

    const response = await fetch(
      "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: stabilityPrompt,
              weight: 1,
            },
          ],
          cfg_scale: 7,
          height: dimensions.height,
          width: dimensions.width,
          samples: 1,
          steps: 30,
          style_preset: style === "vivid" ? "enhance" : "natural",
        }),
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Stability AI API error:", errorData)

      if (response.status === 402) {
        return NextResponse.json(
          { error: "Insufficient credits or billing issue with Stability AI." },
          { status: 402 }
        )
      }

      return NextResponse.json(
        { error: `Stability AI API error: ${errorData.message || "Unknown error"}` },
        { status: response.status }
      )
    }

    const data = await response.json()

    if (!data.artifacts || data.artifacts.length === 0) {
      return NextResponse.json(
        { error: "No image generated" },
        { status: 500 }
      )
    }

    // Convert base64 to data URL
    const base64Image = data.artifacts[0].base64
    const imageUrl = `data:image/png;base64,${base64Image}`

    return NextResponse.json({
      success: true,
      imageUrl,
      prompt,
      size,
      style,
      seed: data.artifacts[0].seed,
    })

  } catch (error) {
    console.error("Image generation error:", error)

    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    )
  }
}
