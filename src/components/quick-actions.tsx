"use client";

import * as React from "react";
import { useChat } from "@/context/chat-context";

export function QuickActions() {
  const { sendMessage } = useChat();

  const actions = [
    {
      query: "What is NAVADA?",
      description: "Learn about NAVADA's capabilities",
      response: "NAVADA is a movement. It represents the fusion of artistic vision, technological innovation, and digital empowerment, driving forward a new era in the AI revolution. NAVADA isn't just a tool—it's a transformative platform designed to meet the evolving needs of creators, entrepreneurs, and visionaries who seek to harness the power of AI. By bridging the gap between advanced digital assistance and human ingenuity, NAVADA empowers individuals to achieve their goals, redefine their industries, and inspire a global shift toward a more innovative, accessible, and creative future. It's not just about keeping up with the AI revolution; it's about leading it."
    },
    {
      query: "How can you help me with stocks?",
      description: "Discover stock analysis features",
    },
    {
      query: "Show me some stock analysis examples",
      description: "View sample analyses",
    },
    {
      query: "What data sources do you use?",
      description: "Learn about our data",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      {actions.map((action) => (
        <button
          key={action.query}
          onClick={() => sendMessage(action.query, action.response)}
          className="group relative flex flex-col items-start gap-1 rounded-lg border p-3 sm:p-4 hover:bg-white/5 transition-colors border-white/10"
        >
          <div className="text-sm sm:text-base font-medium text-foreground group-hover:text-primary transition-colors">
            {action.query}
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground">
            {action.description}
          </div>
        </button>
      ))}
    </div>
  );
} 