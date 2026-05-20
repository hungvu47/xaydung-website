export type Job = {
  id: string;
  title: string;
  location: string;
  type: string;
  description: string;
};

export const jobs: Job[] = [
  {
    id: "kts-noi-that",
    title: "Kiến trúc sư nội thất (Junior/Senior)",
    location: "Đà Nẵng",
    type: "Toàn thời gian",
    description:
      "Tham gia triển khai concept, phối cảnh 3D và bản vẽ shopdrawing; phối hợp giám sát hiện trường.",
  },
  {
    id: "giam-sat-thi-cong",
    title: "Giám sát thi công",
    location: "Đà Nẵng · Hà Nội",
    type: "Toàn thời gian",
    description:
      "Kiểm soát tiến độ, chất lượng hạng mục hoàn thiện; làm việc với đội nhà thầu và chủ đầu tư.",
  },
  {
    id: "ke-toan-noi-bo",
    title: "Kế toán nội bộ",
    location: "Đà Nẵng",
    type: "Toàn thời gian",
    description: "Theo dõi dòng tiền, hợp đồng và hồ sơ thanh toán; hỗ trợ báo cáo quản trị.",
  },
];
