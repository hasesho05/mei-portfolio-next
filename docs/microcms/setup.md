# microCMS セットアップ手順

コードは環境変数が入った時点で自動的に microCMS へ切り替わる（未設定のあいだはダミーデータ）。
無料プランのエンドポイント上限は3つ。`works` と `commissions` の2つだけ使い、
3つ目はお知らせ・撮影メニュー・サイト共通設定などのために温存する。

## 1. サービスを作る

1. <https://microcms.io> でアカウント登録し、サービスを作成する
2. サービスID（`xxxx.microcms.io` の `xxxx` 部分）が `MICROCMS_SERVICE_DOMAIN` になる

## 2. API を2つ作る（スキーマをインポート）

API 作成時にエンドポイント名を入力し、フィールドを1つずつ作る代わりに
「APIスキーマのインポート」でこのディレクトリの JSON を読み込む。

| エンドポイント | インポートするファイル |
| --- | --- |
| `works` | `works-schema.json` |
| `commissions` | `commissions-schema.json` |

エンドポイント名はコードが参照しているので**正確にこの通り**にする。
インポートがエラーになった場合は、下の「フィールド一覧」を見ながら手動で作成する。

インポート後にやること（スキーマ JSON では表現できない設定）:

- `commissions` の「カット」繰り返しフィールドに回数制限 **3〜3** を設定する
  （レイアウトが3カット前提のため。3枚未満のエントリはコードが表示から落とす）

## 3. API キーを環境変数に入れる

microCMS の「API キー」から GET 権限のキーをコピーし、`.env.local` に追記する:

```
MICROCMS_SERVICE_DOMAIN=サービスID
MICROCMS_API_KEY=APIキー
```

dev サーバーを再起動すると反映される。**環境変数が入った時点でダミーデータは
表示されなくなる**ので、CMS が空のままだと各ページは空になる。先にコンテンツを
1件入れてから確認するとよい。

Vercel にも同じ2つを環境変数として登録する（Production / Preview 両方）。
本番は `revalidate: 3600` で1時間キャッシュされる。即時反映したい場合は再デプロイする。

## 4. コンテンツの入れ方

### works（Portfolio・個人制作）

| フィールド | 内容 |
| --- | --- |
| slug | URL になる。英小文字とハイフン（例 `quiet-bloom`） |
| title | 作品名 |
| category | Editorial / Campaign / Portrait など |
| client | クライアント名。個人制作は Personal Work など |
| publishedAt | 年（例 `2026`） |
| thumbnail | 一覧に出る画像 |
| images | 詳細ページに並ぶ画像。空ならサムネイルが1枚表示される |

### commissions（Corporate + Wedding 共通）

| フィールド | 内容 |
| --- | --- |
| slug | URL になる（例 `sanei-hq-relocation`） |
| service | `corporate` か `wedding`。ここで掲載ページが決まる |
| title | 案件名 |
| metaItems | ラベル＋値を3つ程度。Corporate は クライアント/媒体/年、Wedding は 会場/エリア/年 |
| cuts | **必ず3枚**。1枚目がリードカット。映像作品はリードの videoUrl に YouTube/Vimeo の URL |
| hoverImage | ムービー作品のみ。一覧でホバー時にクロスフェードする第2フレーム |

動画の実体は YouTube / Vimeo に置き、CMS には視聴ページの URL だけを入れる
（対応形式: `youtube.com/watch?v=…`、`youtu.be/…`、`vimeo.com/…`）。

## フィールド一覧（手動作成用）

インポートが使えない場合のみ参照。

### works

- slug — テキスト、必須、重複禁止
- title — テキスト、必須
- category — テキスト、必須
- client — テキスト、必須
- publishedAt — テキスト、必須
- thumbnail — 画像、必須
- images — 繰り返し（カスタムフィールド〈画像〉）
  - カスタムフィールド〈画像〉(`workImage`): image — 画像、必須

### commissions

- slug — テキスト、必須、重複禁止
- service — セレクト、必須、複数選択なし、選択肢 `corporate` / `wedding`
- title — テキスト、必須
- metaItems — 繰り返し（カスタムフィールド〈メタ〉）、必須
  - 〈メタ〉(`metaItem`): label — テキスト必須 ／ value — テキスト必須
- cuts — 繰り返し（カスタムフィールド〈カット〉）、必須、回数制限 3〜3
  - 〈カット〉(`cut`): image — 画像必須 ／ alt — テキスト必須 ／ videoUrl — テキスト任意
- hoverImage — カスタムフィールド〈カット〉、任意

フィールドID（`slug` など英字のID）はコードが参照するため一字も変えないこと。
