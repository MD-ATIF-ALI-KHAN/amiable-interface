import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumen — Liquid Glass AI" },
      { name: "description", content: "A liquid-glass AI chat experience." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">
      <div className="glass relative mx-auto max-w-2xl rounded-3xl px-8 py-14">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-aurora shadow-[var(--shadow-glow)]">
          <Sparkles className="h-6 w-6 text-primary-foreground" />
        </div>
        <h1 className="font-display text-5xl leading-tight tracking-tight md:text-6xl">
          <span className="text-aurora italic">Lumen</span>
          <span className="text-foreground/90"> — conversations in glass.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-balance text-muted-foreground">
          A serene, liquid-glass interface for chatting with your AI companion.
          Sign in to start a new thread.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/login"
            className="glass-strong inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition hover:scale-[1.02]"
          >
            Sign in
          </Link>
          <Link
            to="/chat"
            className="inline-flex items-center gap-2 rounded-full bg-aurora px-6 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition hover:scale-[1.02]"
          >
            <MessageCircle className="h-4 w-4" />
            Open chat
          </Link>
        </div>
      </div>
    </main>
  );
}
