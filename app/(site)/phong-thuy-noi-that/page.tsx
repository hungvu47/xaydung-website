import type { Metadata } from "next";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { InnerMain } from "@/components/layout/InnerMain";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/ui/Container";
import { getArticlesByCategory } from "@/data/articles";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Phong thủy nội thất",
  description: `Góc nhìn hiện đại về phong thủy ứng dụng trong nội thất — ${site.name}.`,
  alternates: { canonical: "/phong-thuy-noi-that" },
};

export default function PhongThuyPage() {
  const items = getArticlesByCategory("phong-thuy-noi-that");
  return (
    <InnerMain>
      <PageHeader
        eyebrow="Tạp chí"
        title="Phong thủy nội thất"
        description="Cân bằng luồng khí, ánh sáng và màu sắc phù hợp nhịp sống đương đại."
        crumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Phong thủy nội thất" },
        ]}
      />
      <Container className="grid gap-8 py-16 sm:grid-cols-2 lg:grid-cols-3 lg:py-20">
        {items.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </Container>
    </InnerMain>
  );
}
