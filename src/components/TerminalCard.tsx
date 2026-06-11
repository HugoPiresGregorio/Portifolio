import { useEffect, useState } from "react";

const LINES: { cmd: string; out: string | string[] }[] = [
  { cmd: "whoami", out: "Hugo.dev — full-stack developer" },
  { cmd: "skills --list", out: ["React • Next.js • TypeScript", "Node.js • PostgreSQL • Tailwind"] },
  { cmd: "status", out: "Building awesome things..." },
];

export function TerminalCard() {
  const [typed, setTyped] = useState<{ cmd: string; out: string | string[]; done: boolean }[]>([]);
  const [cursor, setCursor] = useState("");
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= LINES.length) return;
    const target = LINES[step].cmd;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setCursor(target.slice(0, i));
      if (i >= target.length) {
        clearInterval(id);
        setTimeout(() => {
          setTyped((t) => [...t, { ...LINES[step], done: true }]);
          setCursor("");
          setStep((s) => s + 1);
        }, 350);
      }
    }, 55);
    return () => clearInterval(id);
  }, [step]);

  return (
    <div className="glass-card rounded-xl overflow-hidden font-mono text-[13px] sm:text-sm w-full">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-background/60">
        <span className="size-2.5 rounded-full bg-destructive/80" />
        <span className="size-2.5 rounded-full bg-earth" />
        <span className="size-2.5 rounded-full bg-success" />
        <span className="ml-3 text-xs text-muted-foreground">hugo@portfolio: ~</span>
      </div>
      <div className="p-5 space-y-2 min-h-[220px]">
        {typed.map((l, i) => (
          <div key={i} className="space-y-1">
            <div>
              <span className="text-primary">➜</span>{" "}
              <span className="text-success">~</span>{" "}
              <span className="text-foreground">{l.cmd}</span>
            </div>
            {Array.isArray(l.out) ? (
              l.out.map((line, k) => <div key={k} className="text-muted-foreground pl-5">{line}</div>)
            ) : (
              <div className="text-muted-foreground pl-5">{l.out}</div>
            )}
          </div>
        ))}
        {step < LINES.length && (
          <div>
            <span className="text-primary">➜</span>{" "}
            <span className="text-success">~</span>{" "}
            <span className="text-foreground">{cursor}</span>
            <span className="inline-block w-2 h-4 bg-primary align-middle ml-0.5 animate-blink" />
          </div>
        )}
      </div>
    </div>
  );
}
