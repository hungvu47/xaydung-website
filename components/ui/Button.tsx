import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full border text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--qc-gold)]";

const variants = {
  primary:
    "border-transparent bg-[color:var(--qc-gold)] text-[color:var(--qc-bg-deep)] hover:bg-[color:var(--qc-gold-deep)] hover:shadow-[0_12px_40px_rgba(196,165,116,0.25)]",
  ghost:
    "border-white/20 bg-white/5 text-white hover:border-[color:var(--qc-gold)]/60 hover:bg-white/10",
  outlineDark:
    "border-[color:var(--qc-line-dark)] bg-transparent text-[color:var(--qc-ink)] hover:border-[color:var(--qc-gold)] hover:text-[color:var(--qc-gold-deep)]",
  outlineLight:
    "border-white/25 bg-transparent text-white hover:border-[color:var(--qc-gold)]",
} as const;

export type ButtonVariant = keyof typeof variants;

type ButtonProps = {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
} & (
  | ({ href: string } & Omit<ComponentProps<typeof Link>, "href" | "className">)
  | ({ href?: undefined } & ComponentProps<"button">)
);

export function Button({
  variant = "primary",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${className}`.trim();

  if ("href" in rest && rest.href) {
    const { href, ...linkProps } = rest;
    return (
      <Link href={href} className={cls} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonRest } = rest as ComponentProps<"button">;
  return (
    <button type={type} className={cls} {...buttonRest}>
      {children}
    </button>
  );
}
