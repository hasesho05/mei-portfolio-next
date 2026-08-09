import { cache } from "react";

import { dummyCorporateCommissions } from "@/features/commission/data/dummy-corporate";
import { dummyWeddingCommissions } from "@/features/commission/data/dummy-wedding";
import type { Commission } from "@/features/commission/types/commission";

// Replace these implementations with the MicroCMS client when content is ready.
export const getCorporateCommissions = cache(
  async (): Promise<readonly Commission[]> => dummyCorporateCommissions,
);

export const getWeddingCommissions = cache(
  async (): Promise<readonly Commission[]> => dummyWeddingCommissions,
);
