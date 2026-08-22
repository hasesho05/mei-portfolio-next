# Admin 画面(Keystatic)導入 設計書

`content/` を手編集する現行フローを、ブラウザの Admin 画面から編集できるようにする。
フルスクラッチの Admin は作らず、Git-based CMS の **Keystatic** を導入する。

## 目的と方針

- サイトオーナー(非エンジニア)がブラウザからポートフォリオ / Wedding / Corporate の
  コンテンツを追加・編集・並び替えできるようにする。
- コンテンツは引き続き **リポジトリ内のディレクトリ単位**(1作品=1フォルダ、YAML+画像)で
  保存する。DB や外部 CMS は導入しない。
- 保存 = ファイル書き込み(ローカルモード)または Git コミット(GitHub モード)。
  既存の「`content/` → `generate-content.mjs` → 型付きデータモジュール → 静的ビルド」の
  パイプラインは維持する。ジェネレーターの日本語バリデーションは安全網として残す。

## ライブラリ選定

**Keystatic**(`@keystatic/core` 0.6.x + `@keystatic/next` 5.x)を採用する。

- peerDependencies は `next >= 14` / `react ^18.2 || ^19` で、本プロジェクト
  (Next 16.2.10 / React 19.2.7)と互換(2026-08 時点で npm 上の最新で確認済み)。
- コンテンツをリポジトリ内のディレクトリ+YAML+同居画像として保存する設計で、
  現行の `content/` の思想とほぼ一致する。
- スキーマをコード(`keystatic.config.ts`)で宣言でき、ラベルは日本語化できる。
- 比較検討: Decap CMS(設定が別系統の YAML で画像同居が弱い)、TinaCMS(独自クラウド寄り)。
  ディレクトリ同居型 YAML との親和性で Keystatic が最も素直。

## ストレージ構造(移行後)

Keystatic はコレクションのエントリファイル名が `index.yaml` 固定のため、
YAML のファイル名と一部の形を Keystatic 規約に合わせて移行する。
ディレクトリは現行どおり `content/` を使う(名称は本質ではない。`data/` にしたければ
`keystatic.config.ts` とジェネレーターのパス定数を変えるだけ)。

```text
content/
  portfolio/
    order.yaml                 # 表示順シングルトン(旧 order.txt)
    quiet-bloom/               # 1作品 = 1フォルダ(= slug = URL)。現行どおり
      index.yaml               # 旧 work.yaml
      thumbnail.jpg
      (詳細ページ用の追加画像)
  corporate/
    section.yaml               # ページ見出し(現行のまま。シングルトンとして編集)
    order.yaml
    sanei-hq-relocation/
      index.yaml               # 旧 commission.yaml
      01.jpg 02.jpg 03.jpg
      hover.jpg                # 任意
  wedding/                     # corporate と同一構造
```

### YAML の形の変更点

1. `work.yaml` / `commission.yaml` → `index.yaml` にリネーム。
2. サムネイルは暗黙の固定ファイル名をやめ、YAML で明示参照する
   (`thumbnail: thumbnail.jpg`)。Keystatic の image フィールドはファイル名を
   データとして保存するため。既存ファイル名は維持する。
3. commission の `meta` はマップからラベル+値の配列に変更する
   (Keystatic に自由キーのマップ UI がないため)。

   ```yaml
   # 旧                          # 新
   meta:                         meta:
     クライアント: 三栄マテリアル      - label: クライアント
     媒体: ムービー                    value: 三栄マテリアル
                                     - label: 媒体
                                       value: ムービー
   ```

4. `order.txt` → `order.yaml`(シングルトン)。中身は slug の配列。
   Admin 上は relationship の配列フィールドになり、**ドラッグ&ドロップで並び替え**できる。

   ```yaml
   items:
     - quiet-bloom
     - soft-architecture
   ```

ジェネレーターの検証(order に載っていないフォルダ / 存在しない slug / 重複、
cuts は必ず3枚、alt 必須、meta 必須、など)はすべて新形式のまま維持する。

## Keystatic スキーマ設計

`keystatic.config.ts`(リポジトリルート)に定義。ラベル・説明文はすべて日本語。

- **コレクション `portfolio`**(`path: 'content/portfolio/*/'`, `format: { data: 'yaml' }`)
  - `title`(text, slug 元)/ `category` / `client` / `year`(text)
  - `thumbnail`(image, 必須, エントリフォルダに同居)+ `thumbnailAlt`(text, 必須)
  - `images`(array: { image, alt } — 詳細ページ用、0枚可)
- **コレクション `corporate` / `wedding`**(`path: 'content/<service>/*/'`)
  - `title`(text, slug 元)
  - `meta`(array: { label, value }, 1件以上)
  - `cuts`(array: { image, alt, video(url, 任意) }, `validation.length: { min: 3, max: 3 }`)
  - `hover`(object: { image, alt }, 任意)
- **シングルトン `corporateSection` / `weddingSection`**(`path: 'content/<service>/section'`)
  - `title` / `description` / `lede`
- **シングルトン `portfolioOrder` / `corporateOrder` / `weddingOrder`**(`path: 'content/<service>/order'`)
  - `items`(array of relationship → 対応コレクション。ドラッグで並び替え)

slug の命名規則(半角英小文字とハイフン)は Keystatic の slug フィールドが強制する。
公開済み slug の変更禁止は運用ルールとして content-guide に残す(URL が壊れるため)。

## ルーティングと動作モード

- Admin UI: `src/app/keystatic/[[...params]]/page.tsx` + レイアウト(Keystatic 提供の UI)。
- API: `src/app/api/keystatic/[...params]/route.ts`(`makeRouteHandler`)。
- サイト本体のルート(`SiteFrame` / `PageReady` の縛り、デザイントークン)には一切触れない。
  Keystatic のページは独立したルートグループで、サイトのレイアウトを通さない。

### フェーズ1: ローカルモード(`storage: { kind: 'local' }`)

- オーナーのローカルで `pnpm dev` → `http://localhost:3000/keystatic` で編集。
  保存するとローカルの `content/` に書き込まれる。コミット/プッシュは従来どおり
  (手動または AI CLI)。認証は不要(ローカル限定のため)。
- **本番ビルドでは `/keystatic` と `/api/keystatic` を 404 にする**
  (`process.env.NODE_ENV` 判定で `notFound()` / 404 応答)。サーバーレス環境では
  ローカル書き込みが永続しないため、フェーズ2まで本番導線は出さない。

### フェーズ2: GitHub モード(`storage: { kind: 'github', repo: 'hasesho05/mei-portfolio-next' }`)

- デプロイ済みサイトの `/keystatic` から編集可能にする。保存 = このリポジトリへのコミット
  → ホスティングの自動ビルドで反映。
- GitHub App を作成し(Keystatic のセットアップフローが生成を補助)、
  `KEYSTATIC_GITHUB_CLIENT_ID` / `KEYSTATIC_GITHUB_CLIENT_SECRET` / `KEYSTATIC_SECRET` を
  ホスティングの環境変数に設定する。認証は GitHub ログイン(リポジトリに書き込める
  アカウントのみ編集可能)。
- 環境変数の有無でモードを切り替える(env があれば github、なければ local)。
  ローカル開発の体験はフェーズ1のまま変わらない。

## 画像サイズの扱い

Keystatic はアップロード画像をリサイズしない。現行の「長辺 2000px 程度・1枚 500KB 以下」は
人が守るルールのままなので、自動化する:

- `scripts/optimize-images.mjs`(sharp)を追加し、`content/` 内の JPEG を
  長辺 2000px・品質調整で 500KB 以下に正規化する(冪等)。
- `generate-content.mjs` に「500KB 超の画像がある」警告(将来はエラー)を追加し、
  正規化スクリプトの実行を促す。
- GitHub モード導入後は CI(または pre-commit)での自動実行を検討する。

## ジェネレーターとの役割分担

| 関心事 | 担当 |
| --- | --- |
| 編集 UI・スキーマ強制・並び替え | Keystatic |
| 保存形式(ディレクトリ+YAML+画像) | Keystatic(規約)/ Git |
| 型付きデータ生成・ビルド時検証(日本語エラー) | `generate-content.mjs`(現行維持・新形式対応) |
| 画像の読み込み最適化 | `next/image`(現行維持) |

Keystatic の reader API は使わない。データ取得経路(`features/*/api` → `*.generated.ts`)は
変更せず、UI コンポーネントには一切手を入れない。

## 実装フェーズ(= Issue 分割)

各フェーズは独立して完結し、完了時点で `pnpm check` / `tsc --noEmit` / `pnpm build` が
通り、サイトの表示が変わらないこと。

1. **コンテンツ層の Keystatic 互換移行** — レイアウト/YAML 形式の移行スクリプトと
   ジェネレーター改修、docs 更新。Keystatic 本体はまだ入れない。
2. **Keystatic Admin UI 導入(ローカルモード)** — 依存追加、`keystatic.config.ts`、
   ルート追加、本番 404 ガード、往復検証(Admin 保存 → `pnpm generate` が通る)。
3. **GitHub モード対応(本番から編集)** — GitHub App、環境変数切り替え、運用ドキュメント。
4. **画像の自動最適化** — sharp による正規化スクリプトとジェネレーター検証。

1 → 2 → 3 は直列依存。4 は 1〜3 と独立に着手できる。
