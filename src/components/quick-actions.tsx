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
      response: "I can help you with stock analysis in several ways:\n\n1. Real-time Market Data: I can provide current stock prices, market trends, and key metrics for any publicly traded company.\n\n2. Technical Analysis: I can analyze stock patterns, trading volumes, and price movements to help identify potential trends.\n\n3. Company Research: I can provide detailed information about companies, including financial statements, news, and market position.\n\n4. Market Updates: I can keep you informed about major market events, earnings reports, and economic indicators.\n\nRemember, while I provide data and analysis, you should always consult with financial advisors for investment decisions."
    },
    {
      query: "Show me some stock analysis examples",
      description: "View sample analyses",
      response: "Here's an example of how I analyze stocks:\n\n1. Technical Analysis:\n- Price trends and momentum indicators\n- Volume analysis and trading patterns\n- Support and resistance levels\n\n2. Fundamental Analysis:\n- Financial ratios (P/E, EPS, etc.)\n- Company performance metrics\n- Industry comparisons\n\nTry asking me about a specific stock like 'Analyze AAPL' or 'Tell me about Tesla stock' for a real-time example!"
    },
    {
      query: "What data sources do you use?",
      description: "Learn about our data",
      response: "I utilize multiple reliable data sources to provide comprehensive market insights:\n\n1. Alpha Vantage API:\n- Real-time stock prices\n- Historical data\n- Key financial metrics\n\n2. Polygon.io:\n- Market data and analytics\n- Company details\n- Latest news and updates\n\n3. Additional Sources:\n- Company financial reports\n- Market news and analysis\n- Economic indicators\n\nThis multi-source approach ensures accurate and up-to-date information for better market analysis."
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