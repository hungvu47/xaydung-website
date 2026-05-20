export type NavItem = { label: string; href: string; children?: NavItem[] };

export const site = {
  name: "Xây Dựng & Cải Tạo Nhà Lào Cai",
  tagline: "Cải Tạo Đúng Ý - Xây Dựng Đúng Tâm",
  description:
    "Xây dựng & cải tạo nhà Lào Cai - đơn vị thiết kế và thi công xây nhà trọn gói với phong cách hiện đại, tinh tế và bền vững tại Lào Cai.",
  url: "https://qtconcept.vn",
  phone: "097 113 2233",
  email: "contact@qtconcept.vn",
  address: "Lào Cai",
  social: [
    { label: "Facebook", href: "https://www.facebook.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
    { label: "Zalo", href: "https://zalo.me/" },
  ],
} as const;

export const mainNav: NavItem[] = [
  { label: "Trang chủ", href: "/" },
  { label: "Giới thiệu", href: "/gioi-thieu" },
  {
    label: "Dự án",
    href: "/du-an",
    children: [
      { label: "Nhà cấp 4", href: "/du-an?loai=nha-cap-4" },
      { label: "Nhà 2 tầng", href: "/du-an?loai=nha-2-tang" },
      { label: "Nhà 3 tầng", href: "/du-an?loai=nha-3-tang" },
      { label: "Biệt thự", href: "/du-an?loai=biet-thu" },
      { label: "Nhà trọ", href: "/du-an?loai=nha-tro" },
    ],
  },
  // { label: "Tuyển dụng", href: "/tuyen-dung" },
  { label: "Tin tức", href: "/tin-hoat-dong" },
  { label: "Liên hệ", href: "/lien-he" },
];

export const footerColumns = [
  {
    title: "Khám phá",
    links: [
      { label: "Giới thiệu", href: "/gioi-thieu" },
      { label: "Dự án", href: "/du-an" },
      { label: "Tuyển dụng", href: "/tuyen-dung" },
      { label: "Liên hệ", href: "/lien-he" },
    ],
  },
  {
    title: "Mẫu Nhà",
    links: [
      { label: "Nhà cấp 4", href: "/du-an?loai=nha-cap-4" },
      { label: "Nhà 2 tầng", href: "/du-an?loai=nha-2-tang" },
      { label: "Nhà 3 tầng", href: "/du-an?loai=nha-3-tang" },
      { label: "Biệt thự", href: "/du-an?loai=biet-thu" },
      { label: "Nhà trọ", href: "/du-an?loai=nha-tro" },
    ],
  },
  {
    title: "Tạp chí",
    links: [
      { label: "Tin hoạt động", href: "/tin-hoat-dong" },
      { label: "Cẩm nang nội thất", href: "/cam-nang-noi-that" },
      { label: "Phong thủy nội thất", href: "/phong-thuy-noi-that" },
    ],
  },
];

export const stats = [
  { value: "10+", label: "Năm kinh nghiệm" },
  { value: "100+", label: "Công trình" },
  { value: "98%", label: "khách hàng hài lòng" },
  { value: "24/7", label: "Hỗ trợ" },
] as const;

export const aboutIntro = {
  eyebrow: "Giới thiệu",
  title: "Không gian sống\ncủa tương lai",
  paragraphs: [
    "Với hơn 10 năm kinh nghiệm trong ngành thiết kế thi công nội thất, Xây dựng & Cải tạo nhà Lào Cai tự hào là một trong những đơn vị hàng đầu mang đến các giải pháp thiết kế uy tín và chất lượng cho khách hàng.",
    "Hàng trăm dự án lớn nhỏ từ căn hộ chung cư cao cấp, biệt thự, nhà phố đến các không gian thương mại như văn phòng, nhà hàng – khách sạn đã được thực hiện. Từng dự án đều được đầu tư và chăm chút đến từng chi tiết nhỏ nhất để tạo ra không gian sống và làm việc hoàn hảo đúng ý khách hàng.",
  ],
};

export const services = [
  {
    title: "Thiết kế công trình",
    description:
      "Concept, moodboard, bản vẽ kỹ thuật và giám sát ý tưởng từ ý tưởng đến hiện trường.",
    href: "/du-an?loai=nha-2-tang",
  },
  {
    title: "Xây dựng hoàn thiện",
    description:
      "Thi công trọn gói, quản lý tiến độ, nghiệm thu minh bạch và bảo hành rõ ràng.",
    href: "/du-an?loai=nha-3-tang",
  },
  {
    title: "Thiết kế cảnh quan",
    description:
      "Kết nối ánh sáng tự nhiên, cây xanh và lưu thông không khí cho nhà phố & biệt thự.",
    href: "/gioi-thieu",
  },
  {
    title: "Công trình thực tế",
    description:
      "Hồ sơ ảnh thực tế, VR walkthrough và báo cáo tiến độ cho chủ đầu tư.",
    href: "/du-an",
  },
] as const;

export const processSteps = [
  "Tư vấn & khảo sát hiện trạng",
  "Bản vẽ concept & dự toán",
  "Ký hợp đồng & lập kế hoạch",
  "Thiết kế kỹ thuật & bản vẽ shop",
  "Thi công & giám sát chất lượng",
  "Nghiệm thu & bàn giao",
  "Bảo hành & chăm sóc hậu mãi",
] as const;

export const team = [
  {
    name: "Đặng Đức Nhật",
    role: "Quản lý dự án",
    quote:
      "Thiết kế là nghệ thuật kết nối cảm xúc với không gian, mỗi chi tiết đều mang trong mình một câu chuyện riêng.",
  },
  {
    name: "Huỳnh Việt Nam",
    role: "Trưởng phòng dự toán",
    quote: "Quyết đoán, sáng tạo và luôn hướng tới sự hoàn hảo.",
  },
  {
    name: "Nguyễn Phi Viễn",
    role: "Trưởng phòng thi công",
    quote:
      "Chất lượng không bao giờ là ngẫu nhiên, đó là kết quả của sự cẩn trọng, nỗ lực và tâm huyết.",
  },
  {
    name: "Lê Minh Tiến",
    role: "Giám đốc",
    quote:
      "Sự sáng tạo không bao giờ có giới hạn, và mỗi dự án là một cơ hội để khám phá những điều mới mẻ.",
  },
] as const;

export const partners = [
  "Kohler",
  "Hafele",
  "Toto",
  "Jotun",
  "An Cuong",
  "Miele",
  "Bosch",
  "Philips Hue",
] as const;

export const videoHighlights = [
  {
    title: "Video căn hộ thực tế",
    subtitle: "Trải nghiệm không gian sống sau bàn giao",
    cta: "Xem ngay",
    href: "https://www.youtube.com/",
  },
] as const;
