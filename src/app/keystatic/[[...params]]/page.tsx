import { notFound } from "next/navigation";

// Admin UI はローカルモード(保存 = ローカルの content/ への書き込み)のため、
// 本番ビルドでは導線ごと出さない。GitHub モード対応(Issue #4)で緩和する。
// import() を 404 判定の後に置くことで、Admin のバンドルが本番のページ読み込みに
// 含まれないようにしている。
const KeystaticPage = async () => {
  if (process.env.NODE_ENV === "production") notFound();
  const { default: Keystatic } = await import("../keystatic");
  return <Keystatic />;
};

export default KeystaticPage;
