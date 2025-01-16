import { NextResponse } from "next/server";
import { Groq } from "groq-sdk";

if (!process.env.GROQ_API_KEY) {
  console.error("GROQ_API_KEY is not set in environment variables");
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    console.log("Received chat request");
    const { messages } = await req.json();
    console.log("Messages received:", messages);

    if (!messages || !Array.isArray(messages)) {
      console.error("Invalid messages format:", messages);
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 }
      );
    }

    console.log("Making request to Groq API...");
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are NAVADA BOT, an AI-powered stock trading assistant. 
          You help users with stock market analysis, trading insights, and portfolio management.
          Always provide clear, concise responses focused on financial markets.
          If asked about specific stocks, include relevant metrics and recent performance.
          Never provide specific financial advice or guarantees about investment returns.
          Always remind users that they should do their own research and consult financial advisors for investment decisions.`,
        },
        ...messages,
      ],
      model: "mixtral-8x7b-32768",
      temperature: 0.7,
      max_tokens: 2048,
      stream: false,
    });

    console.log("Received response from Groq API");
    return NextResponse.json(completion.choices[0].message);
  } catch (error) {
    console.error("Detailed error in chat route:", {
      error,
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined
    });
    return NextResponse.json(
      { error: "Failed to process chat request", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
} 