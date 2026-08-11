import type { Commission } from "@/features/commission/types/commission";
import hinagaDesign01 from "./images/corporate/hinaga-design-department/01.jpg";
import hinagaDesign02 from "./images/corporate/hinaga-design-department/02.jpg";
import hinagaDesign03 from "./images/corporate/hinaga-design-department/03.jpg";
import hinagaDesignHover from "./images/corporate/hinaga-design-department/hover.jpg";
import komaFurniture01 from "./images/corporate/koma-meeting-furniture/01.jpg";
import komaFurniture02 from "./images/corporate/koma-meeting-furniture/02.jpg";
import komaFurniture03 from "./images/corporate/koma-meeting-furniture/03.jpg";
import saneiHq01 from "./images/corporate/sanei-hq-relocation/01.jpg";
import saneiHq02 from "./images/corporate/sanei-hq-relocation/02.jpg";
import saneiHq03 from "./images/corporate/sanei-hq-relocation/03.jpg";
import saneiHqHover from "./images/corporate/sanei-hq-relocation/hover.jpg";
import saneiReport01 from "./images/corporate/sanei-integrated-report/01.jpg";
import saneiReport02 from "./images/corporate/sanei-integrated-report/02.jpg";
import saneiReport03 from "./images/corporate/sanei-integrated-report/03.jpg";
import shirasuConference01 from "./images/corporate/shirasu-annual-conference/01.jpg";
import shirasuConference02 from "./images/corporate/shirasu-annual-conference/02.jpg";
import shirasuConference03 from "./images/corporate/shirasu-annual-conference/03.jpg";

/**
 * Corporate commissions, newest first. Each work keeps its three cuts (and
 * the optional hover frame) under images/corporate/<slug>/ next to this
 * file. See docs/content-guide.md for how to add a commission.
 */
export const corporateCommissions = [
  {
    slug: "sanei-hq-relocation",
    title: "本社移転の記録",
    metaItems: [
      { label: "クライアント", value: "三栄マテリアル" },
      { label: "媒体", value: "ムービー" },
      { label: "年", value: "2026" },
    ],
    cuts: [
      {
        image: saneiHq01,
        alt: "ガラスの間仕切りが続く移転後のオフィス廊下",
        videoUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
      },
      {
        image: saneiHq02,
        alt: "天井の配管があらわになった大きな執務フロアを見渡す",
        videoUrl: null,
      },
      {
        image: saneiHq03,
        alt: "観葉植物の並ぶ窓際のカウンター席と街を望む大きな窓",
        videoUrl: null,
      },
    ],
    motionFrame: {
      image: saneiHqHover,
      alt: "照明を落とした廊下の先で明かりの点いた会議室",
      videoUrl: null,
    },
  },
  {
    slug: "koma-meeting-furniture",
    title: "什器カタログ 撮り下ろし",
    metaItems: [
      { label: "クライアント", value: "KOMA工芸" },
      { label: "媒体", value: "スチール" },
      { label: "年", value: "2026" },
    ],
    cuts: [
      {
        image: komaFurniture01,
        alt: "白い一人掛けチェアとアーチ型のフロアランプを置いたショールーム",
        videoUrl: null,
      },
      {
        image: komaFurniture02,
        alt: "淡い緑の壁を背にしたオレンジ色のソファとクッション",
        videoUrl: null,
      },
      {
        image: komaFurniture03,
        alt: "朝の光が床に伸びる無人の会議スペース",
        videoUrl: null,
      },
    ],
    motionFrame: null,
  },
  {
    slug: "hinaga-design-department",
    title: "設計部門 密着",
    metaItems: [
      { label: "クライアント", value: "日永不動産" },
      { label: "媒体", value: "ムービー" },
      { label: "年", value: "2025" },
    ],
    cuts: [
      {
        image: hinagaDesign01,
        alt: "図面に定規を当てて描き込む設計担当者の手元",
        videoUrl: "https://www.youtube.com/watch?v=eRsGyueVLvQ",
      },
      {
        image: hinagaDesign02,
        alt: "モノクロで捉えたデスクに向かう担当者の後ろ姿",
        videoUrl: null,
      },
      {
        image: hinagaDesign03,
        alt: "ノートパソコンと手描きのメモが並ぶ打ち合わせ卓の手元",
        videoUrl: null,
      },
    ],
    motionFrame: {
      image: hinagaDesignHover,
      alt: "上空から見下ろした造成中の現場と作業員の長い影",
      videoUrl: null,
    },
  },
  {
    slug: "sanei-integrated-report",
    title: "統合報告書 撮影",
    metaItems: [
      { label: "クライアント", value: "三栄マテリアル" },
      { label: "媒体", value: "スチール" },
      { label: "年", value: "2025" },
    ],
    cuts: [
      {
        image: saneiReport01,
        alt: "コンクリートとガラスが重なる本社ビルの角",
        videoUrl: null,
      },
      {
        image: saneiReport02,
        alt: "鋭角に張り出したファサードが空を切る建物",
        videoUrl: null,
      },
      {
        image: saneiReport03,
        alt: "見上げた曲面の外壁と細い庇の連なり",
        videoUrl: null,
      },
    ],
    motionFrame: null,
  },
  {
    slug: "shirasu-annual-conference",
    title: "年次カンファレンス 記録",
    metaItems: [
      { label: "クライアント", value: "白洲ホールディングス" },
      { label: "媒体", value: "スチール" },
      { label: "年", value: "2024" },
    ],
    cuts: [
      {
        image: shirasuConference01,
        alt: "開演前の円卓とスクリーンが並ぶ無人の会場",
        videoUrl: null,
      },
      {
        image: shirasuConference02,
        alt: "会場そばのラウンジで言葉を交わす参加者たち",
        videoUrl: null,
      },
      {
        image: shirasuConference03,
        alt: "暗いテーブルの上で手元のノートに書き込む参加者たち",
        videoUrl: null,
      },
    ],
    motionFrame: null,
  },
] satisfies readonly Commission[];
