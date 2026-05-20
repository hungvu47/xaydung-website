import type { Metadata } from "next";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { InnerMain } from "@/components/layout/InnerMain";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/ui/Container";
import { getArticlesByCategory } from "@/data/articles";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Tin hoạt động",
  description: `Hoạt động nổi bật, công trình và cộng đồng ${site.name}.`,
  alternates: { canonical: "/tin-hoat-dong" },
};

export default function TinHoatDongPage() {
  const items = getArticlesByCategory("tin-hoat-dong");
  return (
    <InnerMain>
      <PageHeader
        eyebrow="Tạp chí"
        title="Tin hoạt động"
        description="Cập nhật từ công trường, workshop nội bộ và những câu chuyện đồng hành cùng khách hàng."
        crumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Tin hoạt động" },
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
