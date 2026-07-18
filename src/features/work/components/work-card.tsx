"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import type { MouseEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import type { Work } from "@/features/work/types/work";

type WorkCardProps = Readonly<{
  index: number;
  isHidden: boolean;
  isSelected: boolean;
  onSelectionSettled: () => void;
  onSelect: (slug: string) => void;
  work: Work;
}>;

export const WorkCard = ({
  index,
  isHidden,
  isSelected,
  onSelectionSettled,
  onSelect,
  work,
}: WorkCardProps) => {
  const shouldReduceMotion = useReducedMotion();
  const imageRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const aspectRatio = `${work.thumbnail.width} / ${work.thumbnail.height}`;
  const isInteractionDisabled = !isLoaded || isHidden;

  const handleLoadComplete = useCallback(() => {
    if (isLoaded) return;
    setIsLoaded(true);
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) return;
    if (imageRef.current?.complete) {
      handleLoadComplete();
      return;
    }

    const timeout = window.setTimeout(handleLoadComplete, 4000);
    return () => window.clearTimeout(timeout);
  }, [handleLoadComplete, isLoaded]);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (isInteractionDisabled) return;
    onSelect(work.slug);
  };

  return (
    <motion.article
      initial={false}
      animate={{
        opacity: isHidden ? 0 : 1,
        scale: isSelected && !shouldReduceMotion ? 1.05 : 1,
      }}
      transition={{ duration: isSelected ? 0.43 : 0.25 }}
      aria-hidden={isHidden ? true : undefined}
      inert={isHidden ? true : undefined}
      onAnimationComplete={() => {
        if (isSelected) onSelectionSettled();
      }}
    >
      <Link
        className="work-card"
        aria-disabled={isInteractionDisabled ? true : undefined}
        data-disabled={isInteractionDisabled ? "true" : undefined}
        data-hidden={isHidden ? "true" : undefined}
        href={`/work/${work.slug}`}
        onClick={handleClick}
        tabIndex={isInteractionDisabled ? -1 : undefined}
      >
        <motion.div
          className="work-card__inner"
          initial="rest"
          animate={isSelected ? "hover" : "rest"}
          whileHover="hover"
          whileFocus="hover"
        >
          <motion.span
            className="work-card__surface"
            aria-hidden="true"
            variants={{
              rest: { opacity: 0, scale: 0.9 },
              hover: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.22 }}
          />
          <div
            className="work-card__media"
            style={
              { "--work-aspect-ratio": aspectRatio } as React.CSSProperties
            }
          >
            <div className="work-card__reveal">
              <Image
                className="work-card__image"
                ref={imageRef}
                src={work.thumbnail.src}
                alt={work.thumbnail.alt}
                fill
                loading="eager"
                priority={index < 4}
                sizes="(min-width: 768px) 25vw, 100vw"
                onLoad={handleLoadComplete}
                onError={handleLoadComplete}
              />
            </div>
          </div>
          <h2 className="work-card__title">
            <span>{work.category}</span>
            <span>{work.title}</span>
          </h2>
        </motion.div>
      </Link>
    </motion.article>
  );
};
