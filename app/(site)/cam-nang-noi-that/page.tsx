import type { Metadata } from "next";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { InnerMain } from "@/components/layout/InnerMain";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/ui/Container";
import { getArticlesByCategory } from "@/data/articles";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Cẩm nang nội thất",
  description: `Bài viết chuyên sâu về thiết kế nội thất, vật liệu và quy trình — ${site.name}.`,
  alternates: { canonical: "/cam-nang-noi-that" },
};

export default function CamNangPage() {
  const items = getArticlesByCategory("cam-nang-noi-that");
  return (
    <InnerMain>
      <PageHeader
        eyebrow="Tạp chí"
        title="Cẩm nang nội thất"
        description="Gợi ý bố cục, lựa chọn vật liệu và kinh nghiệm vận hành không gian sống bền vững."
        crumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Cẩm nang nội thất" },
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
