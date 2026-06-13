import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Apple, ArrowRight, Eye, EyeOff, Mail, Lock, Sparkles } from "lucide-react";
import { Field } from "@/components/login/Field";
import { SocialButton } from "@/components/login/SocialButton";
import { GoogleIcon } from "@/components/login/GoogleIcon";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Lumen" },
      { name: "description", content: "Sign in to your Lumen account." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    navigate({ to: "/chat" });
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center px-4 py-12">
      {/* Floating orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[10%] top-[15%] h-72 w-72 rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.78 0.16 60 / 70%), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[10%] right-[8%] h-96 w-96 rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.65 0.22 320 / 70%), transparent 70%)" }}
      />

      <div className="glass relative z-10 w-full max-w-md rounded-3xl p-8 md:p-10">
        <Link to="/" className="mb-8 inline-flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-aurora">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display text-xl italic">Lumen</span>
        </Link>

        <h1 className="font-display text-4xl leading-tight tracking-tight">
          Welcome <span className="text-aurora italic">back</span>
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to continue your conversations.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <Field
            icon={<Mail className="h-4 w-4" />}
            label="Email"
            type="email"
            placeholder="you@domain.com"
            value={email}
            onChange={setEmail}
            autoComplete="email"
            required
          />

          <div>
            <Field
              icon={<Lock className="h-4 w-4" />}
              label="Password"
              type={showPass ? "text" : "password"}
              placeholder="••••••••"
              value={pass}
              onChange={setPass}
              autoComplete="current-password"
              required
              trailing={
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="text-muted-foreground transition hover:text-foreground"
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
            />
            <div className="mt-2 flex justify-end">
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground">
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="group mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-aurora px-5 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition hover:scale-[1.01] active:scale-[0.99]"
          >
            Sign in
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
          <div className="h-px flex-1 bg-border" />
          or continue with
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <SocialButton label="Google" icon={<GoogleIcon />} />
          <SocialButton label="Apple" icon={<Apple className="h-4 w-4" />} />
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          New here?{" "}
          <a href="#" className="text-foreground underline-offset-4 hover:underline">
            Create an account
          </a>
        </p>
      </div>
    </main>
  );
}

