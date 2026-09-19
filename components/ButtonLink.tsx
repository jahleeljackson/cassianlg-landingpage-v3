import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "inverse" | "line";
};

const variants = {
  primary: "bg-navy text-cream hover:bg-navy/90",
  inverse: "bg-cream text-navy hover:bg-gray-soft",
  line: "border border-current bg-transparent hover:bg-navy hover:text-cream",
};

export function ButtonLink({
  href,
  children,
  className = "",
  variant = "primary",
}: ButtonLinkProps) {
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`inline-flex items-center justify-center px-6 py-3 text-sm font-semibold tracking-wide transition ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
