export function Field({
  icon,
  label,
  trailing,
  value,
  onChange,
  ...rest
}: {
  icon: React.ReactNode;
  label: string;
  trailing?: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3 transition focus-within:border-[oklch(0.78_0.16_60_/_60%)] focus-within:shadow-[0_0_0_3px_oklch(0.78_0.16_60_/_15%)]">
        <span className="text-muted-foreground">{icon}</span>
        <input
          {...rest}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
        />
        {trailing}
      </div>
    </label>
  );
}
