import type { Metadata } from "next";
import { InnerMain } from "@/components/layout/InnerMain";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description: `Về ${site.name} - hành trình phát triển, sứ mệnh và giá trị cốt lõi.`,
  alternates: { canonical: "/gioi-thieu" },
};

export default function AboutPage() {
  return (
    <InnerMain>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <img
            src="https://res.cloudinary.com/dymstje4v/image/upload/q_auto/f_auto/v1779089884/photo-1600585154340-be6161a56a0c_kcogc1.webp"
            alt="Xây nhà Lào Cai"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />

        </div>

        <Container className="relative py-24 lg:py-32">
          <div className="max-w-3xl space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              Về chúng tôi
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-white lg:text-5xl">
              Xây nhà trọn gói tại Lào Cai Không chỉ đẹp, mà phải bền
            </h1>
            <p className="text-white/70">
              Thiết kế - thi công - xây dựng - cải tạo nhà với quy trình minh bạch,
              kiểm soát chặt chẽ và cam kết không phát sinh chi phí.
            </p>
          </div>
        </Container>
      </section>

      {/* STORY */}
      <Container className="py-16">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div>
            <h2 className="text-3xl text-white">
              Câu chuyện thương hiệu
            </h2>

            <p className="mt-6 text-justify text-white/70">
              Chúng tôi bắt đầu từ một nhóm thiết kế nhỏ tại Lào Cai - nơi việc xây
              dựng không chỉ là câu chuyện thẩm mỹ, mà còn là bài toán về khí hậu,
              địa hình và độ bền công trình.
            </p>

            <p className="mt-4 text-white font-medium text-lg">
              Khách hàng không chỉ cần một ngôi nhà đẹp.
            </p>

            <p className="mt-4 text-justify text-white/70">
              Họ cần một ngôi nhà không nứt, không thấm và không phát sinh chi phí
              ngoài dự tính.
            </p>

            <p>
              Chính điều đó đã định hình cách chúng tôi làm nghề cho đến hôm nay.
            </p>
          </div>

          <div className="relative h-[480px] overflow-hidden rounded-2xl group">
            <img
              src="https://res.cloudinary.com/dymstje4v/image/upload/q_auto/f_auto/v1779162124/ygjzqofkpdkymgnvturd.jpg"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </Container>

      {/* PAIN POINT */}
      <Container className="py-16">
        <div className=" gap-16 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <h3 className="text-2xl text-white mb-2">
            Dịch vụ xây dựng & cải tạo nhà tại Lào Cai
          </h3>

          <ul className="space-y-1 text-white/70">
            <li>Xây nhà trọn gói tại Lào Cai (chìa khóa trao tay)</li>
            <li>Thiết kế kiến trúc nhà phố, biệt thự hiện đại</li>
            <li>Cải tạo, sửa chữa nhà cũ, nâng tầng, tối ưu công năng</li>
            <li>Thi công nội thất trọn gói</li>
            <li>Tư vấn vật liệu phù hợp khí hậu Lào Cai</li>
          </ul>
        </div>
      </Container>

      {/* SOLUTION */}
      <Container className="py-16">
        <div className=" gap-16 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <h3 className="text-2xl text-white mb-2">
            Sứ mệnh
          </h3>

          <p>
            Mang đến dịch vụ <strong className="text-white">xây dựng & cải tạo nhà uy tín tại Lào Cai</strong>,
            giúp khách hàng an tâm từ ý tưởng đến khi hoàn thiện.
          </p>
          <p>
            Mỗi công trình đều được kiểm soát bằng checklist kỹ thuật, hồ sơ minh bạch và quy trình rõ ràng,
            đảm bảo chất lượng và tiến độ thi công.
          </p>
        </div>
      </Container>

      {/* TECH */}
      <Container className="py-16">
        <div className="gap-16 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <h3 className="text-2xl text-white mb-2">
            Tầm nhìn
          </h3>

          <ul className="space-y-1">
            <li>Trở thành đơn vị xây nhà trọn gói hàng đầu tại Lào Cai</li>
            <li>Phát triển giải pháp nhà ở hiện đại, tiết kiệm năng lượng</li>
            <li>Mở rộng hệ sinh thái vật liệu xanh và công nghệ smarthome</li>
          </ul>
        </div>
      </Container>

      {/* PROCESS */}
      <Container className="py-16">
        <div className="gap-16 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <h3 className="text-2xl text-white mb-2">
            Giá trị cốt lõi
          </h3>

          <p>
            <span className="font-semibold text-white">Trung thực</span> trong báo giá,{" "}
            <span className="font-semibold text-white">sáng tạo</span> trong thiết kế,{" "}
            <span className="font-semibold text-white">tận tâm</span> trong thi công,{" "}
            <span className="font-semibold text-white">kỷ luật</span> trong tiến độ và{" "}
            <span className="font-semibold text-white">tử tế</span> trong hợp tác với khách hàng.
          </p>
        </div>
      </Container>

      <Container className="py-12">
        <div className="gap-16 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <h3 className="text-2xl text-white mb-2">
            Vì sao chọn chúng tôi?
          </h3>

          <p>
            <span className="font-semibold text-white">Trung thực</span> trong báo giá,{" "}
            <span className="font-semibold text-white">sáng tạo</span> trong thiết kế,{" "}
            <span className="font-semibold text-white">tận tâm</span> trong thi công,{" "}
            <span className="font-semibold text-white">kỷ luật</span> trong tiến độ và{" "}
            <span className="font-semibold text-white">tử tế</span> trong hợp tác với khách hàng.
          </p>

          <p className="text-white/70">
            Hãy để chúng tôi giúp bạn có một giải pháp rõ ràng,
            minh bạch và bền vững theo thời gian.
          </p>

          <Button href="/lien-he" variant="primary" className="mt-6 px-6 py-3 text-xs uppercase tracking-[0.2em]">
            Liên hệ tư vấn
          </Button>
        </div>
      </Container>

    </InnerMain>
  );
}
