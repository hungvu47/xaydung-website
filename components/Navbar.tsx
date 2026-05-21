"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState, startTransition } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { mainNav, site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Navbar() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    startTransition(() => setOpen(false));
  }, [pathname]);

  const shell = useMemo(() => {
    const solid = scrolled || !isHome;
    return solid
      ? "border-b border-white/10 bg-[color:var(--qc-bg-deep)]/90 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl"
      : "border-b border-transparent bg-transparent";
  }, [isHome, scrolled]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${shell}`}>
      <Container className="flex h-[72px] items-center justify-between gap-6 lg:h-[80px]">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-sm font-semibold tracking-tight text-[color:var(--qc-gold)] transition group-hover:border-[color:var(--qc-gold)]/50">
            <img className="rounded-full overflow-hidden" src="https://res.cloudinary.com/dymstje4v/image/upload/q_auto/f_auto/v1778833327/631021229_122156384366894616_1835816143252707347_n_nyvjwk.jpg" alt="" />
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-[family-name:var(--font-display)] text-[20px] text-white">
              {site.name}
            </span>

          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href.split("?")[0]);
            return (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className={`rounded-full px-3 py-2 text-sm font-medium transition ${active
                    ? "text-[color:var(--qc-gold)]"
                    : "text-white/70 hover:text-white"
                    }`}
                >
                  {item.label}
                </Link>
                {item.children ? (
                  <div className="pointer-events-none invisible absolute left-0 top-full w-56 translate-y-2 rounded-2xl border border-white/10 bg-[color:var(--qc-bg-elevated)]/95 p-2 opacity-0 shadow-2xl backdrop-blur-xl transition group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="block rounded-xl px-3 py-2 text-sm text-white/75 hover:bg-white/5 hover:text-white"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${site.phone.replace(/\s/g, "")}`}
            className="text-sm text-white/70 transition hover:text-white"
          >
            {site.phone}
          </a>
          <Button href="/lien-he" variant="primary" className="px-5 py-2.5 text-xs uppercase tracking-[0.2em]">
            Tư vấn
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Mở menu</span>
          <span className="relative block h-3.5 w-4">
            <span
              className={`absolute left-0 top-0 h-[2px] w-full rounded-full bg-white transition ${open ? "translate-y-1.5 rotate-45" : ""
                }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-[2px] w-full rounded-full bg-white transition ${open ? "opacity-0" : ""
                }`}
            />
            <span
              className={`absolute left-0 top-3 h-[2px] w-full rounded-full bg-white transition ${open ? "-translate-y-1.5 -rotate-45" : ""
                }`}
            />
          </span>
        </button>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-nav"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-white/10 bg-[color:var(--qc-bg-deep)]/98 lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {mainNav.map((item) => (
                <div key={item.href} className="space-y-1">
                  <Link
                    href={item.href}
                    className="block rounded-xl px-3 py-3 text-base font-medium text-white"
                  >
                    {item.label}
                  </Link>
                  {item.children?.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-6 py-2 text-sm text-white/65"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-4">
                <Button href="/lien-he" variant="primary" className="w-full py-3">
                  Đặt lịch tư vấn
                </Button>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="text-center text-sm text-white/70"
                >
                  Gọi {site.phone}
                </a>
              </div>
            </Container>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
