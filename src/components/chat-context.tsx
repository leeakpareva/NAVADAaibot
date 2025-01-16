export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatContextType {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  sendMessage: (message: string) => void;
  isLoading: boolean;
} 