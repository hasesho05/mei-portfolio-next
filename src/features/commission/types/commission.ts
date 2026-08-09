export type CommissionCut = Readonly<{
  alt: string;
  height: number;
  src: string;
  width: number;
}>;

/**
 * One commission, shown as a set of three cuts rather than a single
 * thumbnail. Five corporate works and four wedding works cannot fill a
 * four-column tile grid, so the unit of these pages is a project.
 */
export type Commission = Readonly<{
  cuts: readonly [CommissionCut, CommissionCut, CommissionCut];
  meta: string;
  /**
   * A second frame of the lead cut, from the same shoot. Present only on
   * moving-image work: the cross-fade on hover is the label. `null` keeps the
   * absence explicit rather than relying on an optional property.
   */
  motionFrame: CommissionCut | null;
  slug: string;
  title: string;
}>;
