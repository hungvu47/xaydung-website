export type ArticleCategory = "tin-hoat-dong" | "cam-nang-noi-that" | "phong-thuy-noi-that";

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  date: string;
  readTime: string;
  cover: string;
  body: string[];
};

// const cover = (url: string) => url;

export const articles: Article[] = [
  {
    slug: "kinh-nghiem-xay-nha-tron-goi",
    title: "7 Kinh Nghiệm Xây Nhà Trọn Gói Giúp Gia Chủ Tiết Kiệm Chi Phí",
    excerpt:
      "Những kinh nghiệm quan trọng khi xây nhà trọn gói giúp hạn chế phát sinh, tối ưu ngân sách và đảm bảo chất lượng công trình.",
    category: "tin-hoat-dong",
    date: "2026-05-20",
    readTime: "6 phút",
    cover:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    body: [
      "Xây nhà là một trong những quyết định quan trọng của mỗi gia đình. Tuy nhiên, nhiều gia chủ lần đầu xây nhà thường gặp khó khăn trong việc dự trù ngân sách, lựa chọn vật tư và kiểm soát tiến độ thi công.",

      "Kinh nghiệm đầu tiên là xác định ngân sách thực tế trước khi bắt đầu. Ngoài chi phí xây dựng chính, gia chủ nên dự phòng thêm khoảng 5–10% để xử lý các tình huống phát sinh ngoài kế hoạch.",

      "Lựa chọn đơn vị thi công uy tín cũng là yếu tố quan trọng. Một nhà thầu chuyên nghiệp sẽ có báo giá minh bạch, hợp đồng rõ ràng, cam kết vật tư và quy trình thi công cụ thể.",

      "Thiết kế công năng cần ưu tiên trải nghiệm sử dụng lâu dài thay vì chỉ tập trung vào vẻ đẹp. Không gian đón ánh sáng tự nhiên, bố trí phòng hợp lý và tối ưu lưu thông không khí sẽ giúp ngôi nhà tiện nghi hơn.",

      "Đừng lựa chọn nhà thầu chỉ vì giá rẻ. Một báo giá thấp bất thường thường đi kèm nguy cơ cắt giảm vật liệu hoặc phát sinh chi phí trong quá trình thi công.",

      "Cuối cùng, gia chủ nên thường xuyên theo dõi tiến độ và cập nhật hình ảnh công trình để đảm bảo mọi hạng mục diễn ra đúng kế hoạch.",

      "Một kế hoạch xây dựng rõ ràng ngay từ đầu sẽ giúp tiết kiệm thời gian, ngân sách và mang lại một ngôi nhà bền vững theo năm tháng.",
    ],
  },
  {
    slug: "co-nen-cai-tao-nha-cu-hay-xay-moi",
    title: "Có Nên Cải Tạo Nhà Cũ Hay Xây Mới? Giải Pháp Tối Ưu Cho Gia Chủ",
    excerpt:
      "Nên cải tạo nhà cũ hay xây mới? Tìm hiểu ưu nhược điểm, chi phí và cách lựa chọn phương án phù hợp với ngân sách.",
    category: "tin-hoat-dong",
    date: "2026-05-20",
    readTime: "5 phút",
    cover:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    body: [
      "Sau nhiều năm sử dụng, nhiều ngôi nhà bắt đầu xuất hiện tình trạng xuống cấp như thấm dột, nứt tường, không gian chật chội hoặc công năng không còn phù hợp với nhu cầu sinh hoạt.",

      "Nếu phần móng và kết cấu vẫn còn tốt, cải tạo nhà thường là giải pháp tiết kiệm hơn so với xây mới hoàn toàn. Gia chủ có thể thay đổi mặt tiền, bố trí lại công năng hoặc nâng cấp nội thất để mang đến diện mạo mới.",

      "Tuy nhiên, trong trường hợp công trình đã xuống cấp nghiêm trọng hoặc không còn đáp ứng nhu cầu sử dụng lâu dài, xây mới có thể là phương án tối ưu hơn.",

      "Một sai lầm phổ biến là cải tạo mà không khảo sát kỹ hiện trạng. Điều này dễ dẫn đến phát sinh chi phí, ảnh hưởng kết cấu hoặc làm chậm tiến độ thi công.",

      "Trước khi quyết định, gia chủ nên được khảo sát thực tế và tư vấn phương án phù hợp để cân đối giữa ngân sách, thời gian và hiệu quả sử dụng lâu dài.",
    ],
  },
  {
    slug: "bao-gia-xay-nha-tron-goi-gom-nhung-gi",
    title: "Báo Giá Xây Nhà Trọn Gói Gồm Những Gì? Cách Hạn Chế Phát Sinh",
    excerpt:
      "Tìm hiểu các hạng mục trong báo giá xây nhà trọn gói và những lưu ý giúp hạn chế chi phí phát sinh khi thi công.",
    category: "tin-hoat-dong",
    date: "2026-05-20",
    readTime: "7 phút",
    cover:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858",
    body: [
      "Chi phí xây nhà luôn là vấn đề được nhiều gia chủ quan tâm trước khi bắt đầu thi công. Một bảng báo giá minh bạch sẽ giúp kiểm soát ngân sách và tránh những phát sinh không mong muốn.",

      "Thông thường, báo giá xây nhà trọn gói bao gồm chi phí thiết kế, phần thô, vật tư hoàn thiện và nhân công thi công. Mỗi hạng mục cần được thể hiện rõ trong hợp đồng.",

      "Các yếu tố ảnh hưởng đến chi phí xây dựng gồm diện tích, phong cách thiết kế, vật liệu sử dụng và điều kiện thi công thực tế.",

      "Để hạn chế phát sinh, gia chủ nên thống nhất bản vẽ trước khi thi công, lựa chọn vật tư cụ thể và yêu cầu đơn vị xây dựng cam kết rõ tiến độ cũng như chủng loại vật liệu.",

      "Một đơn vị thi công uy tín không chỉ mang đến báo giá minh bạch mà còn giúp tối ưu giải pháp xây dựng phù hợp với ngân sách thực tế của từng gia đình.",
    ],
  }
];

export const categoryLabels: Record<ArticleCategory, string> = {
  "tin-hoat-dong": "Tin hoạt động",
  "cam-nang-noi-that": "Cẩm nang nội thất",
  "phong-thuy-noi-that": "Phong thủy nội thất",
};

export function getArticlesByCategory(category: ArticleCategory): Article[] {
  return articles.filter((a) => a.category === category);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
