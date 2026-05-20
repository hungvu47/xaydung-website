import { SectionTitle } from "@/components/SectionTitle";
import { ServiceCard } from "@/components/ServiceCard";
import { Container } from "@/components/ui/Container";
import { services } from "@/data/site";

export function ServicesSection() {
  return (
    <section id="dich-vu" className="bg-[color:var(--qc-bg-deep)] py-20 lg:py-28">
      <Container>
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle eyebrow="Dịch vụ" title="Trọn gói từ ý tưởng đến hiện trường" />
          <p className="max-w-md text-sm leading-relaxed text-white/60 lg:text-right">
            Đội ngũ kiến trúc sư, kỹ sư và giám sát hiện trường phối hợp chặt chẽ để bảo toàn chất lượng và
            tiến độ.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s, i) => (
            <ServiceCard key={s.title} {...s} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
