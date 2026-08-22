# Keystatic GitHub モードのセットアップ(エンジニア向け)

デプロイ済みサイトの `/keystatic` からブラウザだけでコンテンツを編集できるようにする
手順。保存 = このリポジトリのデフォルトブランチへのコミット → ホスティングの自動
ビルドで公開反映、という動作になる。

コードは環境変数の有無でモードを自動で切り替える(`keystatic.config.ts` と
`src/lib/keystatic-mode.ts`):

| 状態 | 動作 |
| --- | --- |
| 4つの環境変数がそろっている | GitHub モード。本番の `/keystatic` が有効(GitHub ログイン) |
| そろっていない(未設定・一部欠け) | 本番の `/keystatic` と `/api/keystatic/*` は 404。ローカル開発は従来どおりローカルモード |

## 1. GitHub App を作る

GitHub の Settings → Developer settings → GitHub Apps → **New GitHub App** で
手動作成する(このリポジトリはストレージを環境変数で切り替えるため、変数なしで
起動するとローカルモードになり、Keystatic の App 作成補助フローは表示されない。
補助フローを使いたい場合は `.env` に仮の
`NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=temp` を置いて `pnpm dev` を起動すると
GitHub モードで立ち上がり、セットアップ導線が出る)。

App の設定は最小構成にする:

- **GitHub App name / slug**: 例 `mei-portfolio-admin`(slug は後で環境変数に使う)
- **Callback URL**: `https://<本番ドメイン>/api/keystatic/github/oauth/callback`
  (ローカル検証も行うなら `http://127.0.0.1:3000/api/keystatic/github/oauth/callback` も追加)
- **Webhook**: 無効でよい
- **Repository permissions**: Contents — Read & Write のみ
- 作成後、**Generate a new client secret** で secret を発行して控え、
  App を `hasesho05/mei-portfolio-next` の1リポジトリだけにインストールする

## 2. 環境変数を設定する

ホスティング(Vercel)の Production 環境に以下の4つを設定する:

| 変数 | 中身 |
| --- | --- |
| `KEYSTATIC_GITHUB_CLIENT_ID` | GitHub App の Client ID |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | GitHub App の Client secret(発行して控える) |
| `KEYSTATIC_SECRET` | セッション署名用のランダム文字列。**32文字以上必須**(`openssl rand -hex 32` で生成)。短いと未構成扱いになり `/keystatic` は 404 のまま |
| `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` | GitHub App の slug(App の URL 末尾の名前) |

注意:

- `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` は**ビルド時にクライアントへ
  インライン化される**。設定・変更後は再デプロイ(再ビルド)が必要
- プレビュー環境に設定しなければ、プレビューの `/keystatic` は 404 のまま(推奨)

## 3. 動作確認

1. 再デプロイ後、`https://<本番ドメイン>/keystatic` を開く → GitHub ログインが出る
2. リポジトリに**書き込み権限のあるアカウント**でログイン → 既存作品を編集して保存
3. デフォルトブランチにコミットが積まれ、自動ビルドが走って数分で公開に反映される
4. 書き込み権限のないアカウントでは編集できないことを確認する

認証は GitHub 任せで、独自のユーザー管理はない。リポジトリに書き込める人 =
Admin で編集できる人。

## 運用の決めごと

- **デフォルトブランチへの直コミット運用**とする。Keystatic のブランチ切り替え
  機能(下書きブランチ)は使わない(非エンジニアのオーナーにブランチ概念を
  持ち込まないため)。必要になったら Admin 右上のブランチ UI をそのまま使えばよい
- Admin から保存した内容がジェネレーターの検証に落ちると**ビルドが失敗し、公開は
  前の状態のまま**になる。ビルドログに日本語のエラーが出るので、それに従って
  Admin で修正して保存し直す(オーナー向けの説明は content-guide にある)

## シークレットのローテーション

漏えい時・定期更新時:

1. GitHub App の設定画面で **Generate a new client secret** → 新しい値を
   `KEYSTATIC_GITHUB_CLIENT_SECRET` に設定 → 古い secret を削除
2. `KEYSTATIC_SECRET` は新しいランダム値に差し替えるだけ(全員が再ログインになる)
3. どちらも設定後に再デプロイして反映する
