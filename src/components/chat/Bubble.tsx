import { Sparkles } from "lucide-react";
import type { Message } from "./types";

export function Bubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="glass-strong max-w-[80%] rounded-3xl rounded-tr-lg px-5 py-3 text-sm leading-relaxed">
          {message.text}
        </div>
      </div>
    );
  }
  return (
    <div className="flex gap-3">
      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-aurora shadow-[var(--shadow-glow)]">
        <Sparkles className="h-4 w-4 text-primary-foreground" />
      </div>
      <div className="max-w-[85%] whitespace-pre-wrap text-[15px] leading-relaxed text-foreground/95">
        {message.text}
      </div>
    </div>
  );
}
