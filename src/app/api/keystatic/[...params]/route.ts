// Admin UI と同じく本番では 404(ローカルモードの書き込みは本番で永続しない)。
// Keystatic のハンドラーは import() で遅延構築し、本番ビルドが Admin の
// 依存グラフやファイル監視を抱え込まないようにする。
let cachedHandler: Promise<{
  GET: (request: Request) => Promise<Response>;
  POST: (request: Request) => Promise<Response>;
}> | null = null;

const loadHandler = () => {
  cachedHandler ??= Promise.all([
    import("@keystatic/next/route-handler"),
    import("../../../../../keystatic.config"),
  ]).then(([{ makeRouteHandler }, { default: keystaticConfig }]) =>
    makeRouteHandler({ config: keystaticConfig }),
  );
  return cachedHandler;
};

const respond = async (request: Request) => {
  if (process.env.NODE_ENV === "production")
    return new Response(null, { status: 404 });
  const handler = await loadHandler();
  return (request.method === "POST" ? handler.POST : handler.GET)(request);
};

export const GET = respond;
export const POST = respond;
