# コンテンツ更新ガイド

このサイトの作品データはすべてリポジトリの中にあります。CMS はありません。
写真を所定のフォルダに置き、データファイルに1エントリ足して push すると、
Vercel が自動でサイトを更新します。

エンジニアでなくても大丈夫なように書いてあります。Gemini CLI などの
AI アシスタントに「このガイドに従って作品を追加して」と頼む使い方を想定しています。

## データの場所

| 内容 | データファイル | 画像フォルダ |
| --- | --- | --- |
| Portfolio（個人制作） | `src/features/work/data/works.ts` | 同 `data/images/<slug>/` |
| Corporate（企業案件） | `src/features/commission/data/corporate.ts` | 同 `data/images/corporate/<slug>/` |
| Wedding（結婚写真） | `src/features/commission/data/wedding.ts` | 同 `data/images/wedding/<slug>/` |

`<slug>` は作品ごとの URL になる名前です。半角英小文字とハイフンだけで付けます
（例: `yuigahama-pre-wedding`）。既存の作品と同じ名前は使えません。

## 写真の書き出しルール

- **JPEG** で書き出す。ファイル名は半角英数字（`thumbnail.jpg`, `01.jpg` など）
- **長辺 2000px 程度・1枚 500KB 以下**を目安に。カメラの元データ（数十MB）は
  絶対にそのまま入れない。git の履歴は消えないため、リポジトリが太り続けます
- 色は sRGB。表示サイズへの縮小はサイトが自動でやるので気にしなくてよい

## 動画のルール

**動画ファイルはリポジトリに入れません**（GitHub の容量制限にすぐ達します）。
YouTube か Vimeo にアップロードし、その視聴ページの URL だけをデータに書きます。
対応している形式: `youtube.com/watch?v=…`、`youtu.be/…`、`vimeo.com/…`

## Portfolio に作品を足す

1. `src/features/work/data/images/<slug>/` フォルダを作り、`thumbnail.jpg` を置く
   （詳細ページに並べたい写真があれば `01.jpg`, `02.jpg`… も置く）
2. `works.ts` の先頭に import を足し、`works` 配列の**先頭**（新しい順のため）に
   エントリを足す:

```ts
import morningTide01 from "./images/morning-tide/01.jpg";
import morningTideThumbnail from "./images/morning-tide/thumbnail.jpg";

// works 配列の先頭に:
{
  slug: "morning-tide",
  category: "Editorial",        // Editorial / Campaign / Portrait / Photo Book / Look Book
  title: "Morning Tide",
  client: "Personal Work",
  publishedAt: "2026",
  thumbnail: {
    image: morningTideThumbnail,
    alt: "写真の内容を短く説明する文",  // 目の不自由な人の読み上げに使われます
  },
  images: [
    { image: morningTide01, alt: "写真の説明" },
  ],                             // 無ければ [] のままでよい
},
```

## Corporate / Wedding に案件を足す

1. `src/features/commission/data/images/corporate/<slug>/`（または `wedding/…`）を作り、
   **必ず3枚** `01.jpg` `02.jpg` `03.jpg` を置く。`01` が一番大きく出るメインカット
2. 映像案件なら、一覧のホバーで切り替わる別フレーム `hover.jpg` も置ける（任意）
3. `corporate.ts`（または `wedding.ts`）に import とエントリを足す:

```ts
import midoriCafe01 from "./images/corporate/midori-cafe-opening/01.jpg";
import midoriCafe02 from "./images/corporate/midori-cafe-opening/02.jpg";
import midoriCafe03 from "./images/corporate/midori-cafe-opening/03.jpg";

// corporateCommissions 配列に（新しい順）:
{
  slug: "midori-cafe-opening",
  title: "開店準備の記録",
  metaItems: [
    { label: "クライアント", value: "ミドリ珈琲" },   // Wedding は 会場/エリア/年
    { label: "媒体", value: "スチール" },             // ムービー or スチール
    { label: "年", value: "2026" },
  ],
  cuts: [
    { image: midoriCafe01, alt: "写真の説明", videoUrl: null },
    { image: midoriCafe02, alt: "写真の説明", videoUrl: null },
    { image: midoriCafe03, alt: "写真の説明", videoUrl: null },
  ],
  motionFrame: null,
},
```

映像案件の場合は、メインカット（1枚目）の `videoUrl` に YouTube / Vimeo の URL を
入れると詳細ページにプレイヤーが出ます。`hover.jpg` を置いたときは:

```ts
motionFrame: {
  image: midoriCafeHover,
  alt: "写真の説明",
  videoUrl: null,
},
```

## 確認してから公開する

```bash
pnpm dev        # http://localhost:3000 で見た目を確認
pnpm check      # 書式チェック
pnpm exec tsc --noEmit   # 型チェック（画像パスの間違いはここで見つかる）
pnpm build      # 本番と同じビルドが通るか
```

4つとも通ったら、ブランチを切ってコミットし、push して Pull Request を作ります。
main に直接 push はしません。マージされると Vercel が自動でデプロイします。

## してはいけないこと

- 動画ファイル・カメラの元データをコミットしない
- `src/app/` や `src/components/` などデータファイル以外のコードを、
  コンテンツ追加のついでに触らない（見た目の変更は別の相談として切り出す）
- 既存の slug を書き換えない（公開済みの URL が壊れます）

## AI アシスタントへの頼み方の例

> docs/content-guide.md のルールに従って、デスクトップにある3枚の写真で
> Wedding に「前撮り 江ノ島にて」（会場: 江ノ島 ／ エリア: 藤沢 ／ 年: 2026）を
> 追加して。書き出しサイズの調整もお願い。終わったら確認コマンドを全部実行して。
