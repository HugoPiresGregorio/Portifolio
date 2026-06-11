import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const f = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setP(total > 0 ? (h.scrollTop / total) * 100 : 0);
    };
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <div className="fixed top-16 inset-x-0 h-0.5 z-40 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-primary via-secondary to-success transition-[width] duration-100"
        style={{ width: `${p}%` }}
      />
    </div>
  );
}
