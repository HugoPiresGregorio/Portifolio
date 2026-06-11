import { Github, Linkedin, Mail, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border mt-32 bg-background/40">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="font-mono text-sm text-muted-foreground">
          <span className="text-primary">$</span> echo "© {new Date().getFullYear()} Hug0.d3v"
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
          Vamos contruir <Heart className="size-3.5 text-secondary fill-secondary" /> Ou tomar um café
        </div>
        <div className="flex items-center gap-3">
          {[
            { href: "https://github.com/HugoPiresGregorio", icon: Github, label: "GitHub" },
            { href: "https://www.linkedin.com/in/hugo-pires-gregorio", icon: Linkedin, label: "LinkedIn" },
            { href: "mailto:hug0.d3v@gmail.com", icon: Mail, label: "E-mail" },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noreferrer"
              className="size-9 grid place-items-center rounded-md border border-border hover:border-primary hover:text-primary hover:-translate-y-0.5 transition-all"
            >
              <Icon className="size-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
