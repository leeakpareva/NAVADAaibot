"use client";

import * as React from "react";

interface NewsItem {
  title: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
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
          // Fetch data from all APIs in parallel
          const [alphaResponse, polygonResponse, marketauxResponse] = await Promise.all([
            fetch(`/api/stock?symbol=${symbol}`),
            fetch(`/api/polygon?symbol=${symbol}`),
            fetch(`/api/marketaux?symbol=${symbol}`)
          ]);

          const [alphaData, polygonData, marketauxData] = await Promise.all([
            alphaResponse.ok ? alphaResponse.json() : null,
            polygonResponse.ok ? polygonResponse.json() : null,
            marketauxResponse.ok ? marketauxResponse.json() : null
          ]);

          marketData = {
            alpha: alphaData,
            polygon: polygonData,
            marketaux: marketauxData
          };
        } catch (error) {
          console.error("Error fetching market data:", error);
        }
      }

      // Prepare messages for chat API
      const chatMessages = [
        {
          role: 'system',
          content: `You are NAVADA BOT, an AI-powered stock trading assistant. 
          You help users with stock market analysis, trading insights, and portfolio management.
          Always provide clear, concise responses focused on financial markets.
          If asked about specific stocks, include relevant metrics, recent performance, and market sentiment.
          Never provide specific financial advice or guarantees about investment returns.
          Always remind users that they should do their own research and consult financial advisors for investment decisions.`
        },
        ...messages.map(({ role, content }) => ({ role, content })),
        { role: userMessage.role, content: userMessage.content },
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
Company Name: ${marketData.polygon.details?.name || "N/A"}` : ''}
${marketData.marketaux ? `
Market Sentiment: ${marketData.marketaux.meta?.sentiment_average?.toFixed(2) || "N/A"} (-1 to 1 scale)
Latest News:
${marketData.marketaux.news?.slice(0, 3).map((n: any) => 
  `- ${n.title} (Sentiment: ${n.sentiment?.toFixed(2) || "N/A"})`
).join('\n') || "No recent news"}` : ''}`
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