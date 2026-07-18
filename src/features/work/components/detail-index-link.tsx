"use client";

import { Triangle } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { TransitionLink } from "@/components/navigation/transition-link";

export const DetailIndexLink = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.43,
        delay: shouldReduceMotion ? 0 : 0.08,
        ease: [0.19, 1, 0.22, 1],
      }}
    >
      <TransitionLink className="detail__back" href="/works">
        <Triangle
          className="icon icon--navigation icon--navigation-back"
          aria-hidden="true"
          fill="currentColor"
        />
        <span>Index</span>
      </TransitionLink>
    </motion.div>
  );
};
