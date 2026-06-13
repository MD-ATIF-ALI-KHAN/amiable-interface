import { Sparkles } from "lucide-react";

const prompts = [
  "Explain liquid-glass design in three principles",
  "Plan a slow weekend in Lisbon",
  "Suggest five books bridging design and philosophy",
  "Draft a calming morning routine",
];

export function EmptyState({ onPick }: { onPick: (s: string) => void }) {
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
