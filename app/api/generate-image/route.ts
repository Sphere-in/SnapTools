import { NextRequest } from "next/server";
import { InferenceClient } from "@huggingface/inference";

export const runtime = "edge"; // Optional: for faster execution

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const client = new InferenceClient(process.env.HF_TOKEN);

    const blob = await client.textToImage({
      provider: "nebius", // or "auto"
      model: "black-forest-labs/FLUX.1-schnell",
      inputs: prompt,
      parameters: { num_inference_steps: 5 },
    });
    
   
    if (typeof blob === "string") {
        throw new Error("Expected a Blob, but got a string");
      }
      
      const arrayBuffer = await (blob as Blob).arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": "inline; filename=result.png",
      },
    });
  } catch (error) {
    console.error("Error generating image:", error);
    return new Response(JSON.stringify({ error: "Failed to generate image" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
