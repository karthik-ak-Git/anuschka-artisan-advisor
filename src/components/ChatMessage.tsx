import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp?: Date;
}

const ChatMessage = ({ message, isUser, timestamp }: ChatMessageProps) => {
  return (
    <div className={cn(
      "flex mb-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[80%] rounded-lg p-4 shadow-sm",
        isUser 
          ? "bg-primary text-primary-foreground ml-4" 
          : "bg-card text-card-foreground mr-4 border border-border"
      )}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message}
        </p>
        {timestamp && (
          <span className={cn(
            "text-xs mt-2 block opacity-70",
            isUser ? "text-primary-foreground" : "text-muted-foreground"
          )}>
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;