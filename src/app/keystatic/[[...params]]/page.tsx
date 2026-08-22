import { notFound } from "next/navigation";

import Keystatic from "../keystatic";

// Admin UI はローカルモード(保存 = ローカルの content/ への書き込み)のため、
// 本番ビルドでは導線ごと出さない。GitHub モード対応(Issue #4)で緩和する。
const KeystaticPage = () => {
  if (process.env.NODE_ENV === "production") notFound();
  return <Keystatic />;
};

export default KeystaticPage;
