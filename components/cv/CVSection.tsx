import { ReactNode } from "react";

interface CVSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function CVSection({ title, children, className = "" }: CVSectionProps) {
  return (
    <section className={`mb-12 ${className}`}>
      <h2 className="text-2xl font-bold text-cv-heading mb-6 pb-2 border-b border-cv-border">
        {title}
      </h2>
      {children}
    </section>
  );
}
