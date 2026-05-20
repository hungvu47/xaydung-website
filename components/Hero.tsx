"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";

const heroImage =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-[76px] lg:pt-[80px]">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Không gian nội thất cao cấp"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
      </div>

      <Container className="relative flex min-h-[calc(100svh-76px)] flex-col justify-end pb-24 pt-10 sm:pb-28 lg:min-h-[calc(100svh-80px)] lg:justify-center lg:pb-0 lg:pt-12">
        <div className="max-w-2xl space-y-8">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs font-semibold uppercase tracking-[0.4em] text-[color:var(--qc-gold)]"
          >
            Kiến trúc · Nội thất · Trọn gói
          </motion.p>
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="font-[family-name:var(--font-display)] text-4xl leading-[1.05] text-white sm:text-5xl lg:text-6xl"
          >
            Không gian sống
            <span className="block text-white/90">dành riêng cho bạn</span>
          </motion.h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl text-base leading-relaxed text-white/75 sm:text-lg"
          >
            {site.tagline}. Chúng tôi kiến tạo trải nghiệm sống tinh tế - từ ý tưởng đến bàn giao - với quy
            trình minh bạch và chất liệu cao cấp.
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button href="/lien-he" variant="primary" className="px-7 py-3 text-xs uppercase tracking-[0.22em]">
              Nhận báo giá
            </Button>
            <Button href="/du-an" variant="ghost" className="px-7 py-3 text-xs uppercase tracking-[0.22em]">
              Xem dự án
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="pointer-events-none absolute bottom-10 right-6 hidden text-[11px] uppercase tracking-[0.35em] text-white/35 lg:block"
        >
          Cuộn để khám phá
        </motion.div>
      </Container>
    </section>
  );
}
