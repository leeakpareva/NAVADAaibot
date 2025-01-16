"use client";

import * as React from "react";

interface NewsItem {
  title: string;
  // Add other news properties as needed
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatContextType {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  sendMessage: (message: string, predefinedResponse?: string) => void;
  isLoading: boolean;
}

const ChatContext = React.createContext<ChatContextType | undefined>(undefined);

// Helper function to extract stock symbols
function extractStockSymbol(message: string): string | null {
  const patterns = [
    /\$([A-Z]{1,5})\b/,  // $AAPL
    /\(([A-Z]{1,5})\)/,  // (AAPL)
    /\b([A-Z]{1,5})(?=\s+stock|\s+share|\s+price|\s+earnings|\s+financials)\b/, // AAPL stock
  ];

  for (const pattern of patterns) {
    const match = message.match(pattern);
    if (match?.[1]) return match[1];
  }

  const companies: { [key: string]: string } = {
    "apple": "AAPL",
    "microsoft": "MSFT",
    "google": "GOOGL",
    "amazon": "AMZN",
    "tesla": "TSLA",
    "meta": "META",
    "facebook": "META",
  };

  const messageLower = message.toLowerCase();
  for (const [company, symbol] of Object.entries(companies)) {
    if (messageLower.includes(company)) return symbol;
  }

  return null;
}

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const sendMessage = async (content: string, predefinedResponse?: string) => {
    setIsLoading(true);
    try {
      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content
      };
      setMessages(prev => [...prev, userMessage]);

      // If there's a predefined response, use it
      if (predefinedResponse) {
        await new Promise(resolve => setTimeout(resolve, 500));
        const response: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: predefinedResponse
        };
        setMessages(prev => [...prev, response]);
        return;
      }

      // Extract stock symbol if present
      const symbol = extractStockSymbol(content);
      let marketData = null;
      if (symbol) {
        try {
          // Fetch data from both APIs in parallel
          const [alphaResponse, polygonResponse] = await Promise.all([
            fetch(`/api/stock?symbol=${symbol}`),
            fetch(`/api/polygon?symbol=${symbol}`)
          ]);

          const [alphaData, polygonData] = await Promise.all([
            alphaResponse.ok ? alphaResponse.json() : null,
            polygonResponse.ok ? polygonResponse.json() : null
          ]);

          marketData = {
            alpha: alphaData,
            polygon: polygonData
          };
        } catch (error) {
          console.error("Error fetching market data:", error);
        }
      }

      // Prepare messages for chat API
      const chatMessages = [
        ...messages,
        userMessage,
        ...(marketData ? [{
          role: 'system',
          content: `Current market data for ${symbol}:
${marketData.alpha ? `
Price: $${marketData.alpha.quote?.["05. price"] || "N/A"}
Change: ${marketData.alpha.quote?.["09. change"] || "N/A"} (${marketData.alpha.quote?.["10. change percent"] || "N/A"})
Market Cap: ${marketData.alpha.overview?.MarketCapitalization || "N/A"}
PE Ratio: ${marketData.alpha.overview?.PERatio || "N/A"}` : ''}
${marketData.polygon ? `
Previous Close: $${marketData.polygon.previousClose?.c || "N/A"}
Volume: ${marketData.polygon.previousClose?.v || "N/A"}
Company Name: ${marketData.polygon.details?.name || "N/A"}
Recent News: ${marketData.polygon.news?.slice(0, 2).map((n: NewsItem) => n.title).join(" | ") || "N/A"}` : ''}`
        }] : [])
      ];

      // Send to chat API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatMessages })
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content
      };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error in sendMessage:", error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I apologize, but I encountered an error. Please try again."
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, setMessages, sendMessage, isLoading }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = React.useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}