import type { Commission } from "@/features/commission/types/commission";

const unsplash = (id: string, width: number, height: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&h=${height}&q=80`;

export const dummyCorporateCommissions = [
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
        src: unsplash("photo-1497366754035-f200968a6e72", 1200, 1600),
        alt: "ガラスの間仕切りが続く移転後のオフィス廊下",
        width: 1200,
        height: 1600,
        videoUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
      },
      {
        src: unsplash("photo-1504384308090-c894fdcc538d", 900, 1200),
        alt: "天井の配管があらわになった大きな執務フロアを見渡す",
        width: 900,
        height: 1200,
        videoUrl: null,
      },
      {
        src: unsplash("photo-1497215728101-856f4ea42174", 900, 1200),
        alt: "観葉植物の並ぶ窓際のカウンター席と街を望む大きな窓",
        width: 900,
        height: 1200,
        videoUrl: null,
      },
    ],
    motionFrame: {
      src: unsplash("photo-1541746972996-4e0b0f43e02a", 1200, 1600),
      alt: "照明を落とした廊下の先で明かりの点いた会議室",
      width: 1200,
      height: 1600,
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
        src: unsplash("photo-1524758631624-e2822e304c36", 1200, 1600),
        alt: "白い一人掛けチェアとアーチ型のフロアランプを置いたショールーム",
        width: 1200,
        height: 1600,
        videoUrl: null,
      },
      {
        src: unsplash("photo-1567016432779-094069958ea5", 900, 1200),
        alt: "淡い緑の壁を背にしたオレンジ色のソファとクッション",
        width: 900,
        height: 1200,
        videoUrl: null,
      },
      {
        src: unsplash("photo-1497366811353-6870744d04b2", 900, 1200),
        alt: "朝の光が床に伸びる無人の会議スペース",
        width: 900,
        height: 1200,
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
        src: unsplash("photo-1503387762-592deb58ef4e", 1200, 1600),
        alt: "図面に定規を当てて描き込む設計担当者の手元",
        width: 1200,
        height: 1600,
        videoUrl: "https://www.youtube.com/watch?v=eRsGyueVLvQ",
      },
      {
        src: unsplash("photo-1553877522-43269d4ea984", 900, 1200),
        alt: "モノクロで捉えたデスクに向かう担当者の後ろ姿",
        width: 900,
        height: 1200,
        videoUrl: null,
      },
      {
        src: unsplash("photo-1454165804606-c3d57bc86b40", 900, 1200),
        alt: "ノートパソコンと手描きのメモが並ぶ打ち合わせ卓の手元",
        width: 900,
        height: 1200,
        videoUrl: null,
      },
    ],
    motionFrame: {
      src: unsplash("photo-1541888946425-d81bb19240f5", 1200, 1600),
      alt: "上空から見下ろした造成中の現場と作業員の長い影",
      width: 1200,
      height: 1600,
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
        src: unsplash("photo-1481253127861-534498168948", 1200, 1600),
        alt: "コンクリートとガラスが重なる本社ビルの角",
        width: 1200,
        height: 1600,
        videoUrl: null,
      },
      {
        src: unsplash("photo-1487958449943-2429e8be8625", 900, 1200),
        alt: "鋭角に張り出したファサードが空を切る建物",
        width: 900,
        height: 1200,
        videoUrl: null,
      },
      {
        src: unsplash("photo-1518005020951-eccb494ad742", 900, 1200),
        alt: "見上げた曲面の外壁と細い庇の連なり",
        width: 900,
        height: 1200,
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
        src: unsplash("photo-1511578314322-379afb476865", 1200, 1600),
        alt: "開演前の円卓とスクリーンが並ぶ無人の会場",
        width: 1200,
        height: 1600,
        videoUrl: null,
      },
      {
        src: unsplash("photo-1568992687947-868a62a9f521", 900, 1200),
        alt: "会場そばのラウンジで言葉を交わす参加者たち",
        width: 900,
        height: 1200,
        videoUrl: null,
      },
      {
        src: unsplash("photo-1517048676732-d65bc937f952", 900, 1200),
        alt: "暗いテーブルの上で手元のノートに書き込む参加者たち",
        width: 900,
        height: 1200,
        videoUrl: null,
      },
    ],
    motionFrame: null,
  },
] satisfies readonly Commission[];
