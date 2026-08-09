/**
 * Minimal MicroCMS REST client. The free plan allows three endpoints; this
 * site uses `works` (portfolio) and `commissions` (corporate + wedding,
 * split by the `service` select field) and keeps the third slot free.
 *
 * Configuration comes from `MICROCMS_SERVICE_DOMAIN` and `MICROCMS_API_KEY`.
 * While they are absent — local development before the CMS exists — callers
 * receive `null` and fall back to their dummy data.
 */

export type MicroCmsImage = Readonly<{
  url: string;
  width: number;
  height: number;
}>;

type MicroCmsListResponse<T> = Readonly<{
  contents: readonly T[];
}>;

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

// The whole catalogue is a handful of entries; one page far below the API
// maximum fetches everything, so callers never need pagination.
const listLimit = 100;

export const fetchMicroCmsList = async <T>(
  endpoint: string,
): Promise<readonly T[] | null> => {
  if (!serviceDomain || !apiKey) return null;

  const response = await fetch(
    `https://${serviceDomain}.microcms.io/api/v1/${endpoint}?limit=${listLimit}`,
    {
      headers: { "X-MICROCMS-API-KEY": apiKey },
      next: { revalidate: 3600 },
    },
  );

  if (!response.ok) {
    throw new Error(
      `MicroCMS request failed: ${endpoint} responded ${response.status}`,
    );
  }

  const data: MicroCmsListResponse<T> = await response.json();
  return data.contents;
};
