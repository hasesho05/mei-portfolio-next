import type { Metadata } from "next";

import { PageReady } from "@/components/layout/page-ready";
import { getWeddingCommissions } from "@/features/commission/api/get-commissions";
import { CommissionBand } from "@/features/commission/components/commission-band";

export const metadata: Metadata = {
  title: "Wedding",
  description: "前撮りを中心にした結婚の写真の仕事。",
};

const WeddingPage = async () => {
  const commissions = await getWeddingCommissions();

  return (
    <main className="commission commission--wedding site-shell">
      <PageReady />

      <div className="commission__head">
        <h1 className="commission__title">Wedding</h1>
        <p className="commission__lede">
          前撮りを中心に、結婚の写真をお受けしています。1日のなかから数カットずつを選んで並べています。
        </p>
      </div>

      <ol className="commission__list">
        {commissions.map((commission, index) => (
          <CommissionBand
            commission={commission}
            index={index}
            key={commission.slug}
            variant="wedding"
          />
        ))}
      </ol>
    </main>
  );
};

export default WeddingPage;
