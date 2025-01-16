"use client";

import * as React from "react";
import { useChat } from "@/context/chat-context";

export function QuickActions() {
  const { sendMessage } = useChat();

  const actions = [
    {
      title: "Market Trends",
      query: "Show me the latest market trends and major indices performance",
    },
    {
      title: "AAPL Analysis",
      query: "Analyze Apple (AAPL) stock performance and provide key metrics",
    },
    {
      title: "Market Prediction",
      query: "Based on current market data, what are the potential market movements for next week?",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={() => sendMessage(action.query)}
          className="group relative p-6 rounded-xl bg-secondary/5 border border-white/5 hover:bg-secondary/10 hover:border-primary/20 transition-all duration-300 flex items-center justify-center text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
          <span className="relative text-base text-secondary-foreground/90 group-hover:text-primary transition-colors">
            {action.title}
          </span>
        </button>
      ))}
    </div>
  );
} 