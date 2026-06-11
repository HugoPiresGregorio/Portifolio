import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { useState, useEffect } from "react";

const links = [
  { to: "/", label: "home" },
  { to: "/projetos", label: "projetos" },
  { to: "/artigos", label: "artigos" },
  { to: "/curriculo", label: "curriculo" },
  { to: "/contato", label: "contato" },
] as const;

export function Navbar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl bg-background/70 border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid place-items-center size-8 rounded-md bg-gradient-to-br from-primary to-secondary glow-ring">
            <Terminal className="size-4 text-white" />
          </span>
          <span className="font-mono text-sm">
            <span className="text-muted-foreground">~/</span>
            <span className="text-foreground">hugo</span>
            <span className="text-primary">.dev</span>
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-1 font-mono text-sm">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="relative px-3 py-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="text-primary mr-0.5">/</span>
                  {l.label}
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-md bg-primary/15 border border-primary/30"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden size-10 grid place-items-center rounded-md border border-border"
        >
          <div className="flex flex-col gap-1.5">
            <span className={`block h-0.5 w-5 bg-foreground transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-foreground transition ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-foreground transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </nav>

      {open && (
        <motion.ul
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="md:hidden overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl"
        >
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="block px-6 py-4 font-mono text-sm border-b border-border/50 hover:bg-primary/10"
              >
                <span className="text-primary mr-1">/</span>
                {l.label}
              </Link>
            </li>
          ))}
        </motion.ul>
      )}
    </motion.header>
  );
}
