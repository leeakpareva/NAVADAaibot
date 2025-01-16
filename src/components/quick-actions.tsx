"use client";

import * as React from "react";
import { useChat } from "@/context/chat-context";

interface QuickActionProps {
  title: string;
  description: string;
  onClick: () => Promise<void>;
}

const QuickAction = ({ title, description, onClick }: QuickActionProps) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await onClick();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="w-full text-left p-6 bg-background rounded-lg border border-[hsl(var(--border))] hover:bg-secondary/50 transition-colors relative"
    >
      {isLoading && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-muted-foreground mt-1">{description}</p>
    </button>
  );
};

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