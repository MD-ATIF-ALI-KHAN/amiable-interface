export function SocialButton({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <button
      type="button"
      className="glass flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium transition hover:bg-[oklch(1_0_0_/_14%)]"
    >
      {icon}
      {label}
    </button>
  );
}
