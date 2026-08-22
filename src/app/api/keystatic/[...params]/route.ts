import { makeRouteHandler } from "@keystatic/next/route-handler";

import keystaticConfig from "../../../../../keystatic.config";

const handler = makeRouteHandler({ config: keystaticConfig });

// Admin UI と同じく本番では 404(ローカルモードの書き込みは本番で永続しない)。
const respondNotFound = () => new Response(null, { status: 404 });

export const GET =
  process.env.NODE_ENV === "production" ? respondNotFound : handler.GET;
export const POST =
  process.env.NODE_ENV === "production" ? respondNotFound : handler.POST;
