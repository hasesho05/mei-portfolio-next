import Image from "next/image";

import type { Commission } from "@/features/commission/types/commission";

export type CommissionVariant = "corporate" | "wedding";

type CommissionBandProps = Readonly<{
  commission: Commission;
  index: number;
  variant: CommissionVariant;
}>;

const cutRoles = ["lead", "second", "third"] as const;

// The three cuts occupy very different track widths, and the two pages lay
// them out differently. Without a per-role hint the browser downloads the
// lead crop for every cut.
const cutSizes = {
  corporate: [
    "(min-width: 48rem) 33vw, 100vw",
    "(min-width: 48rem) 17vw, 50vw",
    "(min-width: 48rem) 17vw, 50vw",
  ],
  wedding: [
    "(min-width: 48rem) 40vw, 100vw",
    "(min-width: 48rem) 30vw, 66vw",
    "(min-width: 48rem) 20vw, 66vw",
  ],
} as const;

const formatIndex = (index: number) => String(index + 1).padStart(2, "0");

export const CommissionBand = ({
  commission,
  index,
  variant,
}: CommissionBandProps) => (
  <li className="commission-band">
    <div className="commission-band__inner">
      <div className="commission-band__caption" data-step="3">
        <p className="commission-band__index">{formatIndex(index)}</p>
        <h2 className="commission-band__title">{commission.title}</h2>
        <p className="commission-band__meta">{commission.meta}</p>
      </div>

      <div className="commission-band__cuts">
        {commission.cuts.map((cut, cutIndex) => (
          <div
            className="commission-cut"
            data-role={cutRoles[cutIndex]}
            data-step={cutIndex}
            key={cut.src}
          >
            <span className="commission-cut__surface" aria-hidden="true" />
            <span className="commission-cut__media">
              <Image
                className="commission-cut__frame"
                src={cut.src}
                alt={cut.alt}
                fill
                priority={index === 0 && cutIndex === 0}
                sizes={cutSizes[variant][cutIndex]}
              />
              {/* The second frame sits on top of the primary one and is
                  hidden at rest, so a failed load can never obscure the cut
                  underneath. Its presence marks moving-image work; ムービー
                  is also written in the caption so the fact does not depend
                  on hover. */}
              {cutIndex === 0 && commission.motionFrame ? (
                <Image
                  className="commission-cut__frame commission-cut__frame--next"
                  src={commission.motionFrame.src}
                  alt={commission.motionFrame.alt}
                  fill
                  sizes={cutSizes[variant][0]}
                />
              ) : null}
            </span>
          </div>
        ))}
      </div>
    </div>
  </li>
);
