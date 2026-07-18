import { cache } from "react";

import { dummyWorks } from "@/features/work/data/dummy-works";
import type { Work } from "@/features/work/types/work";

// Replace this implementation with the MicroCMS client when content is ready.
export const getWorks = cache(async (): Promise<readonly Work[]> => dummyWorks);

export const getWorkBySlug = cache(
  async (slug: string): Promise<Work | undefined> =>
    dummyWorks.find((work) => work.slug === slug),
);
