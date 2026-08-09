import { cache } from "react";

import { dummyCorporateCommissions } from "@/features/commission/data/dummy-corporate";
import { dummyWeddingCommissions } from "@/features/commission/data/dummy-wedding";
import type {
  Commission,
  CommissionCut,
  CommissionMetaItem,
  CommissionService,
} from "@/features/commission/types/commission";
import { fetchMicroCmsList, type MicroCmsImage } from "@/lib/microcms";

/**
 * The `commissions` endpoint schema:
 * - slug        text, unique
 * - service     select — corporate | wedding (MicroCMS returns selects as arrays)
 * - title       text
 * - metaItems   repeated custom field〈メタ〉 label / value
 * - cuts        repeated custom field〈カット〉 image / alt / videoUrl(optional)
 * - hoverImage  custom field〈カット〉, optional — second frame of the lead cut
 */
type MicroCmsCommissionCut = Readonly<{
  image: MicroCmsImage;
  alt: string;
  videoUrl?: string;
}>;

type MicroCmsCommission = Readonly<{
  slug: string;
  service: readonly string[];
  title: string;
  metaItems?: readonly CommissionMetaItem[];
  cuts?: readonly MicroCmsCommissionCut[];
  hoverImage?: MicroCmsCommissionCut;
}>;

const toCut = (cut: MicroCmsCommissionCut): CommissionCut => ({
  alt: cut.alt,
  height: cut.image.height,
  src: cut.image.url,
  videoUrl: cut.videoUrl || null,
  width: cut.image.width,
});

// The layout depends on exactly three cuts per commission. An entry that has
// not been filled in yet is dropped rather than rendered broken.
const toCommission = (entry: MicroCmsCommission): Commission | null => {
  const [lead, second, third] = (entry.cuts ?? []).map(toCut);
  if (!lead || !second || !third) return null;

  return {
    cuts: [lead, second, third],
    metaItems: (entry.metaItems ?? []).map((item) => ({
      label: item.label,
      value: item.value,
    })),
    motionFrame: entry.hoverImage ? toCut(entry.hoverImage) : null,
    slug: entry.slug,
    title: entry.title,
  };
};

const dummyCommissions = {
  corporate: dummyCorporateCommissions,
  wedding: dummyWeddingCommissions,
} as const;

// Both services share one endpoint, so the list is fetched once per request.
const getAllCommissionEntries = cache(async () =>
  fetchMicroCmsList<MicroCmsCommission>("commissions"),
);

export const getCommissions = cache(
  async (service: CommissionService): Promise<readonly Commission[]> => {
    const entries = await getAllCommissionEntries();
    if (entries === null) return dummyCommissions[service];

    return entries
      .filter((entry) => entry.service.includes(service))
      .map(toCommission)
      .filter((commission) => commission !== null);
  },
);

export const getCommissionBySlug = cache(
  async (
    service: CommissionService,
    slug: string,
  ): Promise<Commission | undefined> => {
    const commissions = await getCommissions(service);
    return commissions.find((commission) => commission.slug === slug);
  },
);
