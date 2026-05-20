import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-[color:var(--qc-bg-deep)] px-6 py-24 text-center">
      <Container narrow className="space-y-6">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--qc-gold)]">404</p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl text-white">Trang không tồn tại</h1>
        <p className="text-sm text-white/60">
          Liên kết có thể đã thay đổi. Hãy quay về trang chủ hoặc khám phá dự án của chúng tôi.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href="/" variant="primary" className="px-6 py-3 text-xs uppercase tracking-[0.2em]">
            Trang chủ
          </Button>
          <Button href="/du-an" variant="ghost" className="px-6 py-3 text-xs uppercase tracking-[0.2em]">
            Dự án
          </Button>
        </div>
        <p className="text-xs text-white/35">
          Cần hỗ trợ?{" "}
          <Link className="text-[color:var(--qc-gold)] hover:underline" href="/lien-he">
            Liên hệ
          </Link>
        </p>
      </Container>
    </div>
  );
}
