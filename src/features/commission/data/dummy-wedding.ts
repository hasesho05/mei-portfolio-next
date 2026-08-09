import type { Commission } from "@/features/commission/types/commission";

const unsplash = (id: string, width: number, height: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&h=${height}&q=80`;

/**
 * Ordered with the pre-wedding sessions first: 前撮り is the service being
 * led with, and the ceremony entry is kept as the single counter-example.
 */
export const dummyWeddingCommissions = [
  {
    slug: "yuigahama-pre-wedding",
    title: "前撮り 海辺にて",
    metaItems: [
      { label: "会場", value: "由比ヶ浜" },
      { label: "エリア", value: "鎌倉" },
      { label: "年", value: "2026" },
    ],
    cuts: [
      {
        src: unsplash("photo-1537633552985-df8429e8048b", 1200, 1600),
        alt: "長いベールを海風になびかせて浜辺に立つ新婦と新郎",
        width: 1200,
        height: 1600,
        videoUrl: null,
      },
      {
        src: unsplash("photo-1544078751-58fee2d8a03b", 900, 1200),
        alt: "岩礁を背にした砂浜に立つ二人のモノクロ写真",
        width: 900,
        height: 1200,
        videoUrl: null,
      },
      {
        src: unsplash("photo-1460978812857-470ed1c77af0", 720, 960),
        alt: "ベール越しに向かい合う二人のモノクロ写真",
        width: 720,
        height: 960,
        videoUrl: null,
      },
    ],
    motionFrame: null,
  },
  {
    slug: "utsukushigahara-pre-wedding",
    title: "前撮り 高原にて",
    metaItems: [
      { label: "会場", value: "美ヶ原" },
      { label: "エリア", value: "長野" },
      { label: "年", value: "2026" },
    ],
    cuts: [
      {
        src: unsplash("photo-1546032996-6dfacbacbf3f", 1200, 1600),
        alt: "風にふくらむベールに包まれて向かい合う二人",
        width: 1200,
        height: 1600,
        videoUrl: null,
      },
      {
        src: unsplash("photo-1520854221256-17451cc331bf", 900, 1200),
        alt: "草地を背景につながれた二人の手元",
        width: 900,
        height: 1200,
        videoUrl: null,
      },
      {
        src: unsplash("photo-1532712938310-34cb3982ef74", 720, 960),
        alt: "霞んだ稜線に向かって並んで歩いていく二人の後ろ姿",
        width: 720,
        height: 960,
        videoUrl: null,
      },
    ],
    motionFrame: null,
  },
  {
    slug: "yamate-garden-pre-wedding",
    title: "前撮り 庭園にて",
    metaItems: [
      { label: "会場", value: "山手迎賓館" },
      { label: "エリア", value: "横浜" },
      { label: "年", value: "2025" },
    ],
    cuts: [
      {
        src: unsplash("photo-1522673607200-164d1b6ce486", 1200, 1600),
        alt: "芝生の上に並べて置かれた二脚の椅子",
        width: 1200,
        height: 1600,
        videoUrl: null,
      },
      {
        src: unsplash("photo-1529636798458-92182e662485", 900, 1200),
        alt: "木の門にかけられた白い布とブーケ",
        width: 900,
        height: 1200,
        videoUrl: null,
      },
      {
        src: unsplash("photo-1550005809-91ad75fb315f", 720, 960),
        alt: "ブーケを持つ新婦と隣に立つ新郎の胸元",
        width: 720,
        height: 960,
        videoUrl: null,
      },
    ],
    motionFrame: null,
  },
  {
    slug: "onna-resort-wedding",
    title: "挙式と披露宴",
    metaItems: [
      { label: "会場", value: "恩納村" },
      { label: "エリア", value: "沖縄" },
      { label: "年", value: "2024" },
    ],
    cuts: [
      {
        src: unsplash("photo-1502635385003-ee1e6a1a742d", 1200, 1600),
        alt: "白いテントの下に整えられたグラスと小さな花器",
        width: 1200,
        height: 1600,
        videoUrl: null,
      },
      {
        src: unsplash("photo-1519671482749-fd09be7ccebf", 900, 1200),
        alt: "灯りを落とした会場で交わされる乾杯のグラス",
        width: 900,
        height: 1200,
        videoUrl: null,
      },
      {
        src: unsplash("photo-1606216794074-735e91aa2c92", 720, 960),
        alt: "夕暮れのヤシの木の下に並んで立つ二人",
        width: 720,
        height: 960,
        videoUrl: null,
      },
    ],
    motionFrame: null,
  },
] satisfies readonly Commission[];
