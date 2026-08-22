/**
 * Keystatic の動作モード判定(サーバー専用)。
 *
 * GitHub モードに必要な4つの環境変数がそろっていれば、デプロイ済みサイトの
 * /keystatic からの編集(保存 = リポジトリへのコミット)を許可する。
 * そろっていない本番環境では Admin を丸ごと 404 にする(ローカルモードの
 * 書き込みはサーバーレス環境で永続しないため)。
 * セットアップ手順: docs/keystatic-github-setup.md
 */
export const isKeystaticGithubConfigured = () =>
  Boolean(
    process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
      process.env.KEYSTATIC_GITHUB_CLIENT_SECRET &&
      process.env.KEYSTATIC_SECRET &&
      process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG,
  );
