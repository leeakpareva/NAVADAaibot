"use client";

import * as React from "react";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

interface ChatContextType {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (content: string) => Promise<void>;
}

const ChatContext = React.createContext<ChatContextType | undefined>(undefined);

async function getStockData(symbol: string) {
  try {
    const response = await fetch(`/api/stock?symbol=${symbol}`);
    if (!response.ok) throw new Error("Failed to fetch stock data");
    return await response.json();
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return null;
  }
}

function extractStockSymbol(message: string): string | null {
  // Common stock symbols patterns
  const patterns = [
    /\(([A-Z]{1,5})\)/, // Matches (AAPL)
    /\$([A-Z]{1,5})\b/, // Matches $AAPL
    /\b([A-Z]{1,5})(?=\s+stock|\s+share|\s+price|\s+earnings|\s+financials)\b/, // Matches AAPL followed by stock-related words
  ];

  for (const pattern of patterns) {
    const match = message.match(pattern);
    if (match?.[1]) return match[1];
  }

  // Check for company names
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

  const sendMessage = async (content: string) => {
    try {
      setIsLoading(true);
      const userMessage: Message = { role: "user", content };
      setMessages((prev) => [...prev, userMessage]);

      // Check if the message contains a stock symbol
      const symbol = extractStockSymbol(content);
      let stockData = null;
      if (symbol) {
        stockData = await getStockData(symbol);
      }

      // Enhance the message with real stock data if available
      const enhancedMessages = [...messages, userMessage];
      if (stockData) {
        enhancedMessages.push({
          role: "system",
          content: `Current market data for ${symbol}:
Price: $${stockData.quote?.["05. price"] || "N/A"}
Change: ${stockData.quote?.["09. change"] || "N/A"} (${stockData.quote?.["10. change percent"] || "N/A"})
Market Cap: ${stockData.overview?.MarketCapitalization || "N/A"}
PE Ratio: ${stockData.overview?.PERatio || "N/A"}
52-Week High: ${stockData.overview?.["52WeekHigh"] || "N/A"}
52-Week Low: ${stockData.overview?.["52WeekLow"] || "N/A"}`,
        });
      }

      // Send to Groq API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: enhancedMessages,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, data]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, isLoading, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = React.useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
} 