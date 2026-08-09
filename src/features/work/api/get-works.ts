import { cache } from "react";

import { dummyWorks } from "@/features/work/data/dummy-works";
import type { Work, WorkImage } from "@/features/work/types/work";
import { fetchMicroCmsList, type MicroCmsImage } from "@/lib/microcms";

/**
 * The `works` endpoint schema:
 * - slug        text, unique
 * - title       text
 * - category    text — Editorial / Campaign / Portrait …
 * - client      text
 * - publishedAt text — the year, e.g. 2026
 * - thumbnail   image
 * - images      repeated custom field〈画像〉 with a single image field
 *
 * The schema carries no per-image alt text, so the work title stands in:
 * every image on a detail page depicts the named work.
 */
type MicroCmsWorkImage = Readonly<{
  image: MicroCmsImage;
}>;

type MicroCmsWork = Readonly<{
  slug: string;
  title: string;
  category: string;
  client: string;
  publishedAt: string;
  thumbnail: MicroCmsImage;
  images?: readonly MicroCmsWorkImage[];
}>;

const toWorkImage = (image: MicroCmsImage, alt: string): WorkImage => ({
  alt,
  height: image.height,
  src: image.url,
  width: image.width,
});

const toWork = (entry: MicroCmsWork): Work => ({
  category: entry.category,
  client: entry.client,
  images: (entry.images ?? []).map((item) =>
    toWorkImage(item.image, entry.title),
  ),
  publishedAt: entry.publishedAt,
  slug: entry.slug,
  thumbnail: toWorkImage(entry.thumbnail, entry.title),
  title: entry.title,
});

export const getWorks = cache(async (): Promise<readonly Work[]> => {
  const entries = await fetchMicroCmsList<MicroCmsWork>("works");
  if (entries === null) return dummyWorks;

  return entries.map(toWork);
});

export const getWorkBySlug = cache(
  async (slug: string): Promise<Work | undefined> => {
    const works = await getWorks();
    return works.find((work) => work.slug === slug);
  },
);
