interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  return (
    <div
      className={`flex gap-3 ${
        role === "user" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
          role === "user"
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground"
        }`}
      >
        {role === "user" ? "U" : "N"}
      </div>
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 shadow-sm ${
          role === "user"
            ? "bg-primary text-primary-foreground ml-auto"
            : "bg-secondary/50 text-secondary-foreground"
        }`}
      >
        <p className="text-sm whitespace-pre-wrap leading-relaxed">{content}</p>
      </div>
    </div>
  );
} 