import { cache } from "react";

import { dummyWorks } from "@/features/work/data/dummy-works";
import type { Work } from "@/features/work/types/work";

export const getWorks = cache(async (): Promise<readonly Work[]> => dummyWorks);

export const getWorkBySlug = cache(
  async (slug: string): Promise<Work | undefined> => {
    const works = await getWorks();
    return works.find((work) => work.slug === slug);
  },
);
