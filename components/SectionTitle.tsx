import { Reveal } from "@/components/motion/Reveal";

type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  align = "left",
  tone = "light",
  className = "",
}: SectionTitleProps) {
  const alignCls = align === "center" ? "text-center mx-auto" : "";
  const eyebrowTone =
    tone === "light"
      ? "text-[color:var(--qc-gold)]"
      : "text-[color:var(--qc-gold-deep)]";
  const titleTone = tone === "light" ? "text-white" : "text-[color:var(--qc-ink)]";

  return (
    <Reveal className={`max-w-3xl space-y-3 ${alignCls} ${className}`.trim()}>
      {eyebrow ? (
        <p
          className={`text-xs font-semibold uppercase tracking-[0.35em] ${eyebrowTone}`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`whitespace-pre-line font-[family-name:var(--font-display)] text-3xl leading-tight sm:text-4xl lg:text-[2.75rem] ${titleTone}`}
      >
        {title}
      </h2>
    </Reveal>
  );
}
