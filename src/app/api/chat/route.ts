import { NextResponse } from "next/server";
import { Groq } from "groq-sdk";

if (!process.env.GROQ_API_KEY) {
  console.error("GROQ_API_KEY is not set in environment variables");
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

type Role = 'system' | 'user' | 'assistant';

interface ChatMessage {
  role: Role;
  content: string;
}

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

    // Transform messages to Groq format by removing the 'id' field
    const groqMessages: ChatMessage[] = messages.map(({ role, content }) => ({
      role: role === 'system' ? 'system' : role === 'assistant' ? 'assistant' : 'user',
      content
    }));

    console.log("Making request to Groq API with messages:", groqMessages);
    const completion = await groq.chat.completions.create({
      messages: groqMessages,
      model: "mixtral-8x7b-32768",
      temperature: 0.7,
      max_tokens: 2048,
      stream: false,
    });

    console.log("Received response from Groq API");
    const responseMessage = {
      role: 'assistant' as const,
      content: completion.choices[0].message.content
    };
    return NextResponse.json(responseMessage);
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