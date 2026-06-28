import { byId } from "@/lib/registry";

export interface Preset {
  id: string;
  name: string;
  tagline: string;
  accent: string;
  blockIds: string[];
}

// Curated presets — composed from real registry ids (verified to exist).
const RAW: Preset[] = [
  {
    id: "saas",
    name: "SaaS 落地页",
    tagline: "导航 · 英雄 · 功能 · 价格 · 常见问题 · 页脚 —— 标准 SaaS 转化漏斗",
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
      "pro-navigation-navigation-2",
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
];

// Keep only blocks that actually exist in the registry, so a preset never breaks.
export const presets: Preset[] = RAW.map((p) => ({
  ...p,
  blockIds: p.blockIds.filter((id) => byId.has(id)),
}));
