import type { Commission } from "@/features/commission/types/commission";
import onnaResort01 from "./images/wedding/onna-resort-wedding/01.jpg";
import onnaResort02 from "./images/wedding/onna-resort-wedding/02.jpg";
import onnaResort03 from "./images/wedding/onna-resort-wedding/03.jpg";
import utsukushigahara01 from "./images/wedding/utsukushigahara-pre-wedding/01.jpg";
import utsukushigahara02 from "./images/wedding/utsukushigahara-pre-wedding/02.jpg";
import utsukushigahara03 from "./images/wedding/utsukushigahara-pre-wedding/03.jpg";
import yamateGarden01 from "./images/wedding/yamate-garden-pre-wedding/01.jpg";
import yamateGarden02 from "./images/wedding/yamate-garden-pre-wedding/02.jpg";
import yamateGarden03 from "./images/wedding/yamate-garden-pre-wedding/03.jpg";
import yuigahama01 from "./images/wedding/yuigahama-pre-wedding/01.jpg";
import yuigahama02 from "./images/wedding/yuigahama-pre-wedding/02.jpg";
import yuigahama03 from "./images/wedding/yuigahama-pre-wedding/03.jpg";

/**
 * Wedding commissions, ordered with the pre-wedding sessions first: 前撮り
 * is the service being led with, and the ceremony entry is kept as the
 * single counter-example. Each work keeps its three cuts under
 * images/wedding/<slug>/ next to this file. See docs/content-guide.md for
 * how to add a commission.
 */
export const weddingCommissions = [
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
        image: yuigahama01,
        alt: "長いベールを海風になびかせて浜辺に立つ新婦と新郎",
        videoUrl: null,
      },
      {
        image: yuigahama02,
        alt: "岩礁を背にした砂浜に立つ二人のモノクロ写真",
        videoUrl: null,
      },
      {
        image: yuigahama03,
        alt: "ベール越しに向かい合う二人のモノクロ写真",
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
        image: utsukushigahara01,
        alt: "風にふくらむベールに包まれて向かい合う二人",
        videoUrl: null,
      },
      {
        image: utsukushigahara02,
        alt: "草地を背景につながれた二人の手元",
        videoUrl: null,
      },
      {
        image: utsukushigahara03,
        alt: "霞んだ稜線に向かって並んで歩いていく二人の後ろ姿",
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
        image: yamateGarden01,
        alt: "芝生の上に並べて置かれた二脚の椅子",
        videoUrl: null,
      },
      {
        image: yamateGarden02,
        alt: "木の門にかけられた白い布とブーケ",
        videoUrl: null,
      },
      {
        image: yamateGarden03,
        alt: "ブーケを持つ新婦と隣に立つ新郎の胸元",
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
        image: onnaResort01,
        alt: "白いテントの下に整えられたグラスと小さな花器",
        videoUrl: null,
      },
      {
        image: onnaResort02,
        alt: "灯りを落とした会場で交わされる乾杯のグラス",
        videoUrl: null,
      },
      {
        image: onnaResort03,
        alt: "夕暮れのヤシの木の下に並んで立つ二人",
        videoUrl: null,
      },
    ],
    motionFrame: null,
  },
] satisfies readonly Commission[];
