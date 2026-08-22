import { notFound } from "next/navigation";

import { isKeystaticGithubConfigured } from "@/lib/keystatic-mode";

// GitHub モードが構成されていない本番では Admin を出さない(ローカルモードの
// 書き込みはサーバーレス環境で永続しないため)。構成されていれば、デプロイ済み
// サイトの /keystatic から GitHub ログインで編集できる。
// import() を 404 判定の後に置くことで、404 になる本番ビルドのページ読み込みに
// Admin のバンドルが含まれないようにしている。
const KeystaticPage = async () => {
  if (process.env.NODE_ENV === "production" && !isKeystaticGithubConfigured())
    notFound();
  const { default: Keystatic } = await import("../keystatic");
  return <Keystatic />;
};

export default KeystaticPage;
