import type { Metadata } from "next";

import { PageReady } from "@/components/layout/page-ready";
import { getCorporateCommissions } from "@/features/commission/api/get-commissions";
import { CommissionBand } from "@/features/commission/components/commission-band";

export const metadata: Metadata = {
  title: "Corporate",
  description: "企業の現場で撮影した写真と映像の仕事。",
};

const CorporatePage = async () => {
  const commissions = await getCorporateCommissions();

  return (
    <main className="commission commission--corporate site-shell">
      <PageReady />

      <div className="commission__head">
        <h1 className="commission__title">Corporate</h1>
        <p className="commission__lede">
          企業の現場でつくった写真と映像を、1件につき数カットずつ並べています。ムービーの作品は、カーソルを重ねると別のフレームに変わります。
        </p>
      </div>

      <ol className="commission__list">
        {commissions.map((commission, index) => (
          <CommissionBand
            commission={commission}
            index={index}
            key={commission.slug}
            variant="corporate"
          />
        ))}
      </ol>
    </main>
  );
};

export default CorporatePage;
