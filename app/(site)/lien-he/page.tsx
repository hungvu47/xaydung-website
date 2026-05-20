import type { Metadata } from "next";
import { InnerMain } from "@/components/layout/InnerMain";
import { PageHeader } from "@/components/PageHeader";
import { ContactSection } from "@/components/sections/ContactSection";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: `Liên hệ ${site.name} — hotline, email và form tư vấn nhanh.`,
  alternates: { canonical: "/lien-he" },
};

export default function ContactPage() {
  return (
    <InnerMain>
      <PageHeader
        eyebrow="Kết nối"
        title="Liên hệ & đặt lịch khảo sát"
        description="Đội ngũ tư vấn sẽ phản hồi trong 24h làm việc. Bạn cũng có thể gọi trực tiếp hotline để được hỗ trợ ngay."
        crumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Liên hệ" },
        ]}
      />
      <ContactSection />
    </InnerMain>
  );
}
