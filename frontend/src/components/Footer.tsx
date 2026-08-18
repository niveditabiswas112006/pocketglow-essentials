import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { formAPI } from "@/lib/api";
import { toast } from "sonner";

export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      const res = await formAPI.subscribeNewsletter(email);
      if (res.success) {
        setDone(true);
        setEmail("");
        toast.success("Welcome to PocketGlow Essentials!");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to subscribe.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer
      className="mt-32"
      style={{ backgroundColor: "var(--footer)", color: "var(--foreground)" }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="font-display text-3xl" style={{ color: "var(--foreground)" }}>
              PocketGlow Essentials
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Snap-and-squeeze sachet skincare for routines that travel with you.
            </p>
            <form onSubmit={handleSubscribe} className="mt-8 max-w-sm">
              <label
                className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground"
              >
                Join the list
              </label>
              <div
                className="mt-2 flex border-b focus-within:border-foreground"
                style={{ borderColor: "var(--border)" }}
              >
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent py-2 outline-none text-sm"
                  style={{ color: "var(--foreground)" }}
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="text-[10px] tracking-[0.3em] uppercase hover:opacity-60 disabled:opacity-40"
                  style={{ color: "var(--foreground)" }}
                >
                  Sign up →
                </button>
              </div>
              {done && (
                <p className="mt-3 text-xs text-muted-foreground">
                  Thanks — welcome to PocketGlow Essentials.
                </p>
              )}
            </form>
          </div>

          <FooterCol
            title="Shop"
            links={[
              { label: "All products", to: "/shop" },
              { label: "Skin", to: "/shop" },
              { label: "Lip", to: "/shop" },
              { label: "Travel kits", to: "/shop" },
            ]}
          />
          <FooterCol
            title="Brand"
            links={[
              { label: "About", to: "/about" },
              { label: "Journal", to: "/about" },
              { label: "Sustainability", to: "/about" },
            ]}
          />
          <FooterCol
            title="Help"
            links={[
              { label: "Account", to: "/login" },
              { label: "Shipping", to: "/about" },
              { label: "Returns", to: "/about" },
              { label: "Contact", to: "/about" },
            ]}
          />
        </div>

        <div
          className="mt-16 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t pt-6 text-[11px] tracking-[0.2em] uppercase text-muted-foreground"
          style={{ borderColor: "var(--border)" }}
        >
          <div>© {new Date().getFullYear()} PocketGlow Essentials</div>
          <div className="flex gap-6">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; to: string }[];
}) {
  return (
    <div>
      <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-5">
        {title}
      </div>
      <ul className="space-y-3 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              to={l.to}
              className="hover:underline"
              style={{ color: "var(--foreground)" }}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
