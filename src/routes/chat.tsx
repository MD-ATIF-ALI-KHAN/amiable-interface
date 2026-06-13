import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowUp,
  MessageSquarePlus,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Settings,
  Sparkles,
  Trash2,
} from "lucide-react";
import { Bubble } from "@/components/chat/Bubble";
import { EmptyState } from "@/components/chat/EmptyState";
import type { Message, Thread } from "@/components/chat/types";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Chat — Lumen" },
      { name: "description", content: "Chat with Lumen, your liquid-glass AI companion." },
    ],
  }),
  component: ChatPage,
});

const seedThreads: Thread[] = [
  {
    id: "t1",
    title: "Designing a liquid-glass UI",
    preview: "Let's explore Apple's frosted aesthetic…",
    updatedAt: "Just now",
    messages: [
      { id: "m1", role: "user", text: "How would you describe a liquid-glass aesthetic in one sentence?" },
      {
        id: "m2",
        role: "assistant",
        text:
          "Imagine surfaces poured from light — translucent panes that bend the world behind them, edged with soft chromatic warmth and quiet depth.",
      },
      { id: "m3", role: "user", text: "Beautiful. Now give me three principles to apply it well." },
      {
        id: "m4",
        role: "assistant",
        text:
          "**1. Hierarchy through blur.** Foreground panes blur more; backgrounds stay crisp.\n\n**2. Borrowed color.** Let the canvas tint the glass — don't paint the glass itself.\n\n**3. Restraint.** One hero element of glass per view; everything else recedes.",
      },
    ],
  },
  {
    id: "t2",
    title: "Weekend in Lisbon",
    preview: "Three days, slow pace, lots of pastel…",
    updatedAt: "2h ago",
    messages: [
      { id: "m1", role: "user", text: "Plan me a calm weekend in Lisbon." },
      { id: "m2", role: "assistant", text: "Start at LX Factory, drift through Alfama at golden hour, end with grilled sardines in Cais do Sodré." },
    ],
  },
  {
    id: "t3",
    title: "Reading list — design + philosophy",
    preview: "Books that bridge form and meaning…",
    updatedAt: "Yesterday",
    messages: [
      { id: "m1", role: "user", text: "Five books that bridge design and philosophy." },
      { id: "m2", role: "assistant", text: "*The Poetics of Space*, *In Praise of Shadows*, *The Design of Everyday Things*, *Ways of Seeing*, *The Timeless Way of Building*." },
    ],
  },
];

function ChatPage() {
  const [threads, setThreads] = useState<Thread[]>(seedThreads);
  const [activeId, setActiveId] = useState<string>(seedThreads[0].id);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const active = threads.find((t) => t.id === activeId) ?? threads[0];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [active?.messages.length, activeId]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeId]);

  function send(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    const userMsg: Message = { id: crypto.randomUUID(), role: "user", text };
    const reply: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      text: "This is a visual mockup — connect an AI backend to make me reply for real. ✨",
    };
    setThreads((prev) =>
      prev.map((t) =>
        t.id === activeId
          ? { ...t, messages: [...t.messages, userMsg, reply], preview: text, updatedAt: "Just now" }
          : t,
      ),
    );
    setInput("");
  }

  function newThread() {
    const id = crypto.randomUUID();
    const t: Thread = {
      id,
      title: "New conversation",
      preview: "Say hello…",
      updatedAt: "Just now",
      messages: [],
    };
    setThreads((prev) => [t, ...prev]);
    setActiveId(id);
  }

  function deleteThread(id: string) {
    setThreads((prev) => {
      const next = prev.filter((t) => t.id !== id);
      if (id === activeId && next[0]) setActiveId(next[0].id);
      return next;
    });
  }

  return (
    <div className="relative flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-80" : "w-0"
        } sticky top-0 hidden h-screen shrink-0 overflow-hidden transition-[width] duration-300 md:block`}
      >
        <div className="glass m-3 mr-0 flex h-[calc(100vh-1.5rem)] flex-col rounded-3xl p-4">
          <Link to="/" className="mb-5 flex items-center gap-2 px-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-aurora">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg italic">Lumen</span>
          </Link>

          <button
            onClick={newThread}
            className="mb-4 flex items-center justify-center gap-2 rounded-2xl bg-aurora px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition hover:scale-[1.01]"
          >
            <MessageSquarePlus className="h-4 w-4" />
            New conversation
          </button>

          <div className="glass mb-3 flex items-center gap-2 rounded-xl px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search threads"
              className="w-full bg-transparent text-sm placeholder:text-muted-foreground/60 focus:outline-none"
            />
          </div>

          <div className="-mr-2 flex-1 overflow-y-auto pr-2">
            <div className="px-2 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Recent
            </div>
            <ul className="space-y-1.5">
              {threads.map((t) => {
                const isActive = t.id === activeId;
                return (
                  <li key={t.id} className="group relative">
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setActiveId(t.id)}
                      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActiveId(t.id)}
                      className={`cursor-pointer rounded-2xl border px-3 py-2.5 transition ${
                        isActive
                          ? "border-[oklch(1_0_0_/_22%)] bg-[oklch(1_0_0_/_10%)]"
                          : "border-transparent hover:bg-[oklch(1_0_0_/_6%)]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="truncate text-sm font-medium">{t.title}</div>
                          <div className="truncate text-xs text-muted-foreground">{t.preview}</div>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteThread(t.id);
                          }}
                          aria-label="Delete thread"
                          className="rounded-md p-1 text-muted-foreground opacity-0 transition hover:bg-[oklch(1_0_0_/_10%)] hover:text-foreground group-hover:opacity-100"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground/70">
                        {t.updatedAt}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-3 flex items-center gap-3 rounded-2xl border border-[var(--color-glass-border)] px-3 py-2.5">
            <div className="h-8 w-8 rounded-full bg-aurora" />
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">Iris Moreau</div>
              <div className="truncate text-xs text-muted-foreground">iris@lumen.app</div>
            </div>
            <button className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground" aria-label="Settings">
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main chat */}
      <section className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 md:px-6">
          <div className="glass flex items-center gap-3 rounded-2xl px-3 py-2">
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              className="hidden rounded-lg p-1.5 text-muted-foreground transition hover:text-foreground md:inline-flex"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeftOpen className="h-4 w-4" />}
            </button>
            <div className="text-sm font-medium">{active?.title}</div>
          </div>
          <div className="glass flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.6_140)]" />
            Lumen · v1
          </div>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 pb-32 pt-4 md:px-10">
          <div className="mx-auto max-w-3xl space-y-6">
            {active?.messages.length === 0 ? (
              <EmptyState onPick={(p) => setInput(p)} />
            ) : (
              active?.messages.map((m) => <Bubble key={m.id} message={m} />)
            )}
          </div>
        </div>

        {/* Composer */}
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 px-4 pb-6 md:left-80 md:px-10">
          <form
            onSubmit={send}
            className="pointer-events-auto mx-auto max-w-3xl"
          >
            <div className="glass-strong relative flex items-end gap-2 rounded-3xl p-2 pl-4">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(e as unknown as FormEvent);
                  }
                }}
                rows={1}
                placeholder="Message Lumen…"
                className="max-h-40 min-h-[44px] flex-1 resize-none bg-transparent py-3 text-sm placeholder:text-muted-foreground/60 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-aurora text-primary-foreground shadow-[var(--shadow-glow)] transition hover:scale-[1.03] disabled:opacity-40 disabled:hover:scale-100"
                aria-label="Send"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-center text-[11px] text-muted-foreground/70">
              Visual mockup · responses are placeholders
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}

function Bubble({ message }: { message: Message }) {
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

function EmptyState({ onPick }: { onPick: (s: string) => void }) {
  const prompts = [
    "Explain liquid-glass design in three principles",
    "Plan a slow weekend in Lisbon",
    "Suggest five books bridging design and philosophy",
    "Draft a calming morning routine",
  ];
  return (
    <div className="flex flex-col items-center pt-16 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-aurora shadow-[var(--shadow-glow)]">
        <Sparkles className="h-7 w-7 text-primary-foreground" />
      </div>
      <h2 className="font-display text-4xl italic">
        How can I help, <span className="text-aurora">Iris</span>?
      </h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Ask anything — or start from one of these.
      </p>
      <div className="mt-8 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
        {prompts.map((p) => (
          <button
            key={p}
            onClick={() => onPick(p)}
            className="glass rounded-2xl px-4 py-3 text-left text-sm text-foreground/90 transition hover:scale-[1.01] hover:bg-[oklch(1_0_0_/_12%)]"
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
