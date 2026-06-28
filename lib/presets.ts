import { byId } from "@/lib/registry";

export interface Preset {
  id: string;
  name: string;
  tagline: string;
  accent: string;
  blockIds: string[];
  /**
   * 缩略图封面用哪个区块。不填则自动取首个 hero。
   * 用于避开"封面是动画初始空帧 / 视频黑屏"的区块，改指向有静态图文内容的区块。
   */
  coverId?: string;
}

// Curated presets — composed from real registry ids (verified to exist).
const RAW: Preset[] = [
  {
    id: "saas",
    name: "SaaS 落地页",
    tagline:
      "导航 · 英雄 · 功能 · 价格 · 常见问题 · 页脚 —— 标准 SaaS 转化漏斗",
    accent: "#7c5cff",
    blockIds: [
      "pro-navigation-navigation-7",
      "pro-hero-hero-1",
      "pro-social-proof-social-proof-1",
      "pro-features-features-1",
      "pro-how-it-works-how-it-works-1",
      "pro-pricing-pricing-1",
      "pro-faq-faq-1",
      "pro-cta-cta-1",
      "pro-footer-footer-1",
    ],
  },
  {
    id: "startup",
    name: "Startup 发布",
    tagline: "强英雄 + 数据 + 案例 + 等候名单 —— 适合新品预热",
    accent: "#00e0c6",
    blockIds: [
      "pro-navigation-navigation-3",
      "pro-hero-hero-10",
      "pro-stats-stats-1",
      "pro-features-features-3",
      "pro-showcase-showcase-1",
      "pro-waitlist-waitlist-1",
      "pro-footer-footer-2",
    ],
  },
  {
    id: "agency",
    name: "Agency 作品集",
    tagline: "案例展示 + 关于 + 对比 + 联系 —— 适合工作室/团队",
    accent: "#ff6b9d",
    blockIds: [
      "pro-navigation-navigation-3",
      "pro-hero-hero-12",
      "pro-showcase-showcase-2",
      "pro-about-about-1",
      "pro-comparison-comparison-1",
      "pro-social-proof-social-proof-2",
      "pro-contact-contact-1",
      "pro-footer-footer-3",
    ],
  },
  {
    id: "product",
    name: "产品营销",
    tagline: "电商风 + 功能亮点 + 下载 —— 适合 App/实体产品",
    accent: "#ffa94d",
    blockIds: [
      "pro-navigation-navigation-4",
      "pro-hero-hero-13",
      "pro-features-features-5",
      "pro-ecommerce-ecommerce-1",
      "pro-stats-stats-2",
      "pro-download-download-1",
      "pro-cta-cta-2",
      "pro-footer-footer-4",
    ],
  },
  {
    id: "minimal",
    name: "极简单页",
    tagline: "克制留白 —— 英雄 + 功能 + CTA + 页脚，四段成页",
    accent: "#a0a0b0",
    blockIds: [
      "pro-hero-hero-2",
      "pro-features-features-2",
      "pro-cta-cta-3",
      "pro-footer-footer-5",
    ],
  },

  // ——— Hero 主题预设：以英雄区为主角，封面即 hero ———
  {
    id: "hero-gallery",
    name: "Hero 画廊",
    tagline: "精选英雄区合集 —— Bento · 大排版 · 编辑式，一次看遍最出彩的开场",
    accent: "#5eead4",
    blockIds: [
      "pro-navigation-navigation-1",
      "pro-hero-hero-18",
      "pro-hero-hero-16",
      "pro-hero-hero-1",
      "pro-hero-hero-17",
      "pro-hero-hero-14",
      "pro-footer-footer-1",
    ],
  },
  {
    id: "dev-tool",
    name: "开发者工具",
    tagline:
      "终端开场 + Aurora 渐变 + UI 数据卡 —— 暗色科技感，专为 DevTool 打造",
    accent: "#818cf8",
    // 封面避开 hero-20 终端（打字动画初始为空帧→缩略图全黑），改用 hero-21 数据卡（有静态柱状图）
    coverId: "pro-hero-hero-21",
    blockIds: [
      "pro-navigation-navigation-1",
      "pro-hero-hero-20",
      "pro-hero-hero-19",
      "pro-features-features-4",
      "pro-hero-hero-21",
      "pro-stats-stats-3",
      "pro-cta-cta-2",
      "pro-footer-footer-7",
    ],
  },
  {
    id: "immersive",
    name: "沉浸视觉",
    tagline: "视频与 3D 背景英雄区 —— 满屏视觉冲击，适合品牌站与产品发布",
    accent: "#fb7185",
    // 封面避开 hero-9 视频（缩略图无海报→黑屏），改用 hero-1 大图分栏
    coverId: "pro-hero-hero-1",
    blockIds: [
      "pro-navigation-navigation-6",
      "pro-hero-hero-9",
      "pro-showcase-showcase-3",
      "pro-hero-hero-4",
      "pro-social-proof-social-proof-4",
      "pro-cta-cta-5",
      "pro-footer-footer-8",
    ],
  },
];

// Keep only blocks that actually exist in the registry, so a preset never breaks.
export const presets: Preset[] = RAW.map((p) => ({
  ...p,
  blockIds: p.blockIds.filter((id) => byId.has(id)),
}));
