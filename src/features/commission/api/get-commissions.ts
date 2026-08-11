import { cache } from "react";

import { dummyCorporateCommissions } from "@/features/commission/data/dummy-corporate";
import { dummyWeddingCommissions } from "@/features/commission/data/dummy-wedding";
import type {
  Commission,
  CommissionService,
} from "@/features/commission/types/commission";

const commissionsByService = {
  corporate: dummyCorporateCommissions,
  wedding: dummyWeddingCommissions,
} as const;

export const getCommissions = cache(
  async (service: CommissionService): Promise<readonly Commission[]> =>
    commissionsByService[service],
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
