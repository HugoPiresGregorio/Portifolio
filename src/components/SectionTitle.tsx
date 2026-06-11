import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function SectionTitle({ kicker, title, children }: { kicker: string; title: string; children?: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <div className="font-mono text-xs text-primary mb-3 flex items-center gap-2">
        <span className="h-px w-8 bg-primary" />
        <span>// {kicker}</span>
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{title}</h2>
      {children && <p className="mt-3 text-muted-foreground max-w-2xl">{children}</p>}
    </motion.div>
  );
}
