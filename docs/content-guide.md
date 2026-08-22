# コンテンツ更新ガイド

サイトに載る写真と文章は、すべて `content/` フォルダの中にあります。
**プログラムのコードを触る必要はありません。** 編集のやり方は2つ:

1. **Admin 画面(おすすめ)** — ブラウザの管理画面から編集する(下記)
2. **ファイルを直接編集** — フォルダに写真を入れて、同じ場所の
   テキストファイル(YAML)を書き、`order.yaml` に1行足す

Gemini CLI などの AI アシスタントに「このガイドに従って作品を追加して」と
頼む使い方も引き続きできます。

## Admin 画面で編集する

```bash
pnpm dev        # 起動したら http://localhost:3000/keystatic を開く
```

Portfolio / Corporate / Wedding の作品の追加・編集、ページ文言、表示順の
ドラッグ並び替えがブラウザでできます。写真もフォームからアップロードできます。
**保存すると `content/` のファイルに書き込まれる**ので、そのあとの確認・
コミットの流れは手編集と同じです(下記「確認してから公開する」)。

覚えておくこと:

- Admin 画面は開発中(`pnpm dev`)専用です。公開サイトには存在しません
- Admin で保存すると、写真が `cuts/0/file.jpg` のような名前に整理されること
  があります。壊れたわけではありません(YAML が正しい置き場所を指しています)
- フォルダ名(URL)は作成時に決まります。一度公開したら変えないでください

## content/ の中身

```
content/
  portfolio/                 個人制作(トップのギャラリー)
    order.yaml               表示順。items: の上の行ほど先に表示
    quiet-bloom/             1作品 = 1フォルダ。フォルダ名がURLになる
      index.yaml             タイトルなどの文言
      thumbnail.jpg          一覧に出る写真
  corporate/                 企業案件
    section.yaml             ページの見出し・リード文
    order.yaml
    sanei-hq-relocation/
      index.yaml
      01.jpg 02.jpg 03.jpg   必ず3枚。01がメイン
      hover.jpg              (任意)一覧のホバーで切り替わる写真
  wedding/                   結婚写真。corporate と同じ構造
```

フォルダ名(= URL)は半角英小文字とハイフンだけ。例: `enoshima-pre-wedding`。
一度公開した作品のフォルダ名は変えないでください(URL が壊れます)。

## 写真のルール

- **JPEG** で書き出す。**長辺 2000px 程度・1枚 500KB 以下**が目安
- カメラの元データ(数十MB)は絶対に入れない。履歴に永久に残ってしまいます
- **動画ファイルは入れない**。YouTube か Vimeo にアップして URL だけを書く

## Portfolio に作品を足す

1. `content/portfolio/` に新しいフォルダを作る(例: `morning-tide/`)
2. `thumbnail.jpg` を入れる。詳細ページにも写真を並べたいなら `01.jpg` `02.jpg`… も
3. フォルダの中に `index.yaml` を作る:

```yaml
title: Morning Tide
category: Editorial        # Editorial / Campaign / Portrait / Photo Book / Look Book
client: Personal Work
year: "2026"
thumbnail: thumbnail.jpg   # 一覧に出る写真のファイル名
thumbnailAlt: 朝の光が差す海辺   # 写真の内容の短い説明(読み上げに使われます)
images:                    # 詳細ページの写真。無ければこの3行ごと省略してよい
  - file: 01.jpg
    alt: 写真の説明
```

4. `content/portfolio/order.yaml` の `items:` の**一番上**にフォルダ名を1行足す
   (新しい順のため):

```yaml
items:
  - morning-tide           # ← 追加した作品
  - quiet-bloom
```

## Corporate / Wedding に案件を足す

1. `content/corporate/`(または `wedding/`)に新しいフォルダを作る
2. 写真を**必ず3枚**、`01.jpg` `02.jpg` `03.jpg` の名前で入れる。01が一番大きく出る
3. フォルダの中に `index.yaml` を作る:

```yaml
title: 開店準備の記録
meta:                      # ラベルは自由。Corporate は クライアント/媒体/年、
  - label: クライアント      # Wedding は 会場/エリア/年 にしている
    value: ミドリ珈琲
  - label: 媒体
    value: スチール          # ムービー or スチール
  - label: 年
    value: "2026"
cuts:
  - file: 01.jpg
    alt: 写真の説明
  - file: 02.jpg
    alt: 写真の説明
  - file: 03.jpg
    alt: 写真の説明
```

4. `order.yaml` の `items:` にフォルダ名を1行足す

**映像案件の場合**: メインカット(1枚目)に `video:` を足すと、詳細ページに
プレイヤーが出ます。`hover.jpg` を入れて `hover:` を書くと、一覧でカーソルを
重ねたときその写真に切り替わります(ムービー作品の合図):

```yaml
cuts:
  - file: 01.jpg
    alt: 写真の説明
    video: https://www.youtube.com/watch?v=XXXXXXXX   # youtu.be / vimeo.com も可
  - ...
hover:
  file: hover.jpg
  alt: 写真の説明
```

## ページの見出しや文言を変える

`content/corporate/section.yaml`(または `wedding/`)を編集します:

```yaml
title: Corporate           # ページの見出し
description: …             # 検索結果などに出る説明文
lede: …                    # 見出しの下のリード文
```

## 並び順を変える

各セクションの `order.yaml` の `items:` の行を入れ替えるだけです。
上の行ほど先に表示されます。

## 確認してから公開する

```bash
pnpm dev        # http://localhost:3000 で見た目を確認
```

書き間違いや写真の入れ忘れがあると、起動時に**日本語のエラー**で場所を教えて
くれます(例:「cuts は必ず3枚です(いまは2枚)」)。直してから再実行してください。
`pnpm dev` を立ち上げたまま content/ を変えた場合は、別のターミナルで
`pnpm generate` を実行すると画面に反映されます。

公開前の最終確認:

```bash
pnpm check
pnpm build
```

両方通ったら、ブランチを切ってコミットし、push して Pull Request を作ります。
main に直接 push はしません。マージされると Vercel が自動でデプロイします。

## してはいけないこと

- 動画ファイル・カメラの元データをコミットしない
- `src/` の中のファイルを触らない(`*.generated.ts` は自動生成されるもので、
  編集しても次の生成で消えます)
- 公開済みのフォルダ名(URL)を変えない

## AI アシスタントへの頼み方の例

> docs/content-guide.md のルールに従って、デスクトップにある3枚の写真で
> Wedding に「前撮り 江ノ島にて」(会場: 江ノ島 ／ エリア: 藤沢 ／ 年: 2026)を
> 追加して。写真の書き出しサイズの調整もお願い。終わったら pnpm check と
> pnpm build で確認して。
