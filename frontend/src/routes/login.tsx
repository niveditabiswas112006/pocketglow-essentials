import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { cn } from "@/lib/utils";
import { authAPI } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const navigate = Route.useNavigate();

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (token) {
        try {
          const res = await authAPI.getProfile();
          if (res.success && res.data) {
            setUser(res.data);
          }
        } catch (err) {
          console.error("Session expired or invalid:", err);
          localStorage.removeItem("token");
        }
      }
    };
    checkLoggedIn();
  }, []);

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      toast.success("Logged out successfully");
      setUser(null);
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout failed");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === "signin") {
        const res = await authAPI.login({ email, password });
        if (res.success) {
          toast.success(`Welcome back, ${res.user.name}!`);
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        }
      } else {
        const res = await authAPI.register({ name, email, password });
        if (res.success) {
          toast.success("Account created successfully!");
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        }
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      const errMsg = err.response?.data?.message || "An authentication error occurred";
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  // Logged-in profile view
  if (user) {
    return (
      <SiteLayout>
        <section className="mx-auto max-w-md px-6 md:px-8 py-24 text-center">
          <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Account
          </div>
          <h1 className="font-display text-5xl mb-6" style={{ color: "var(--foreground)" }}>
            Hello, {user.name}
          </h1>
          <div
            className="rounded-3xl p-8 mb-8 text-left text-sm space-y-3"
            style={{ backgroundColor: "var(--card)" }}
          >
            <div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground block">
                Email
              </span>
              <span style={{ color: "var(--foreground)" }}>{user.email}</span>
            </div>
            <div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground block">
                Role
              </span>
              <span className="capitalize" style={{ color: "var(--foreground)" }}>
                {user.role}
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full rounded-full text-[11px] tracking-[0.3em] uppercase py-4 hover:opacity-90 transition-opacity cursor-pointer"
            style={{ backgroundColor: "var(--foreground)", color: "var(--background)" }}
          >
            Sign out
          </button>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-md px-6 md:px-8 py-24">
        <div className="text-center mb-10">
          <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Account
          </div>
          <h1 className="font-display text-5xl" style={{ color: "var(--foreground)" }}>
            {mode === "signin" ? "Welcome back" : "Join PocketGlow Essentials"}
          </h1>
        </div>

        {/* Mode toggle */}
        <div
          className="grid grid-cols-2 gap-1 mb-8 rounded-full p-1 text-[11px] tracking-[0.25em] uppercase"
          style={{ backgroundColor: "var(--muted)" }}
        >
          {(["signin", "signup"] as const).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setError(null);
              }}
              className="py-2.5 rounded-full transition-colors cursor-pointer"
              style={
                mode === m
                  ? { backgroundColor: "var(--foreground)", color: "var(--background)" }
                  : { color: "var(--muted-foreground)" }
              }
            >
              {m === "signin" ? "Sign in" : "Create"}
            </button>
          ))}
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 text-center text-xs text-red-600 bg-red-50 dark:bg-red-950/20 dark:text-red-400 p-3 rounded-2xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === "signup" && (
            <Field
              label="Name"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <Field
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Field
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full text-[11px] tracking-[0.3em] uppercase py-4 hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
            style={{ backgroundColor: "var(--foreground)", color: "var(--background)" }}
          >
            {loading ? "Processing..." : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          {mode === "signin" ? "Forgot password? " : "By creating an account you agree to our terms."}
          {mode === "signin" && (
            <span className="underline cursor-pointer" style={{ color: "var(--foreground)" }}>
              Reset it
            </span>
          )}
        </p>
      </section>
    </SiteLayout>
  );
}

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
        {label}
      </span>
      <input
        {...props}
        className="mt-2 w-full bg-transparent py-2.5 outline-none text-sm"
        style={{
          color: "var(--foreground)",
          borderBottom: "1px solid var(--border)",
        }}
      />
    </label>
  );
}
