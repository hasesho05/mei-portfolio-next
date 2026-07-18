"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useSiteNavigation } from "@/components/navigation/site-navigation-context";
import type { Work } from "@/features/work/types/work";
import { WorkCard } from "./work-card";

type WorkGridProps = Readonly<{
  works: readonly Work[];
}>;

type TransitionPhase = "idle" | "selected" | "blank";

export const WorkGrid = ({ works }: WorkGridProps) => {
  const router = useRouter();
  const navigation = useSiteNavigation();
  const shouldReduceMotion = useReducedMotion();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [transitionPhase, setTransitionPhase] =
    useState<TransitionPhase>("idle");

  const handleSelect = (slug: string) => {
    if (selectedSlug) return;
    setSelectedSlug(slug);
    setTransitionPhase("selected");

    if (!shouldReduceMotion) navigation?.hideHeader();

    if (shouldReduceMotion) router.push(`/work/${slug}`);
  };

  const handleSelectionSettled = () => {
    if (transitionPhase === "selected" && !shouldReduceMotion) {
      setTransitionPhase("blank");
    }
  };

  const handleBlankComplete = () => {
    if (!selectedSlug) return;

    const href = `/work/${selectedSlug}`;
    if (navigation) {
      navigation.navigate(href, { skipExit: true });
      return;
    }

    router.push(href);
  };

  return (
    <motion.div className="gallery">
      {works.map((work, index) => (
        <WorkCard
          index={index}
          isHidden={
            transitionPhase === "blank" ||
            (selectedSlug !== null && selectedSlug !== work.slug)
          }
          isSelected={selectedSlug === work.slug}
          key={work.slug}
          onSelectionSettled={handleSelectionSettled}
          onSelect={handleSelect}
          work={work}
        />
      ))}
      {transitionPhase === "blank" ? (
        <motion.div
          className="page-transition-blank"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          onAnimationComplete={handleBlankComplete}
        />
      ) : null}
    </motion.div>
  );
};
