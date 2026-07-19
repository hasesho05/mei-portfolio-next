"use client";

import { motion, useReducedMotion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { SiteHeader } from "@/components/layout/site-header";
import {
  type SiteNavigateOptions,
  SiteNavigationContext,
} from "@/components/navigation/site-navigation-context";

type SiteFrameProps = Readonly<{
  children: ReactNode;
}>;

const routeTransition = {
  enter: {
    duration: 0.33,
    ease: [0.25, 1, 0.5, 1] as const,
  },
  exit: {
    duration: 0.33,
    ease: [0.4, 0, 1, 1] as const,
  },
  headerExit: {
    duration: 0.495,
    ease: [0.4, 0, 1, 1] as const,
  },
  hold: {
    duration: 0,
  },
};

type TransitionPhase = "idle" | "exiting" | "waiting" | "entering";

export const SiteFrame = ({ children }: SiteFrameProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const pendingHref = useRef<string | null>(null);
  const previousPathname = useRef(pathname);
  const isAwaitingHeaderExit = useRef(false);
  const hasPushedRoute = useRef(false);
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const [isDetailVeilVisible, setIsDetailVeilVisible] = useState(false);
  const [isHeaderMounted, setIsHeaderMounted] = useState(true);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [headerReadyPath, setHeaderReadyPath] = useState<string | null>(null);
  const [readyPath, setReadyPath] = useState<string | null>(null);
  const currentPage =
    pathname === "/works"
      ? "Selected Work"
      : pathname === "/information"
        ? "Information"
        : null;

  const navigate = useCallback(
    (href: string, options?: SiteNavigateOptions) => {
      if (href === pathname || phase !== "idle") return;

      const destinationHasHeader = href === "/works" || href === "/information";
      if (destinationHasHeader && !currentPage) {
        setIsHeaderMounted(true);
        setIsHeaderVisible(true);
        setHeaderReadyPath(null);
      }

      if (shouldReduceMotion) {
        router.push(href);
        return;
      }

      pendingHref.current = href;
      hasPushedRoute.current = false;

      if (options?.skipExit) {
        isAwaitingHeaderExit.current = isHeaderMounted;
        setIsDetailVeilVisible(true);
        setPhase("waiting");

        if (!isHeaderMounted) {
          hasPushedRoute.current = true;
          router.push(href);
        }
        return;
      }

      setPhase("exiting");
    },
    [currentPage, isHeaderMounted, pathname, phase, router, shouldReduceMotion],
  );

  const hideHeader = useCallback(() => {
    setIsHeaderVisible(false);
  }, []);
  const markPageReady = useCallback(() => {
    setReadyPath(pathname);
    if (currentPage) setHeaderReadyPath(pathname);
  }, [currentPage, pathname]);
  const navigation = useMemo(
    () => ({ hideHeader, markPageReady, navigate }),
    [hideHeader, markPageReady, navigate],
  );

  const handleAnimationComplete = () => {
    if (phase === "exiting" && pendingHref.current) {
      const href = pendingHref.current;
      setPhase("waiting");
      hasPushedRoute.current = true;
      router.push(href);
      return;
    }

    if (phase === "entering" && readyPath === pathname) setPhase("idle");
  };

  const handleHeaderAnimationComplete = () => {
    if (isHeaderVisible) return;

    document.documentElement.dataset.detailTransition = "true";
    setIsHeaderMounted(false);

    if (
      isAwaitingHeaderExit.current &&
      !hasPushedRoute.current &&
      pendingHref.current
    ) {
      hasPushedRoute.current = true;
      router.push(pendingHref.current);
    }
  };

  useEffect(() => {
    if (phase !== "waiting" || pathname !== pendingHref.current) return;

    pendingHref.current = null;
    isAwaitingHeaderExit.current = false;
    hasPushedRoute.current = false;
    setIsDetailVeilVisible(false);
    setPhase("entering");
  }, [pathname, phase]);

  useEffect(() => {
    if (!pathname.startsWith("/work/")) return;

    delete document.documentElement.dataset.detailTransition;
  }, [pathname]);

  useEffect(() => {
    const isHeaderRoute = pathname === "/works" || pathname === "/information";
    const isReturningFromDetail = previousPathname.current.startsWith("/work/");

    if (isHeaderRoute && isReturningFromDetail) {
      delete document.documentElement.dataset.detailTransition;
      setIsDetailVeilVisible(false);
      setIsHeaderMounted(true);
      setIsHeaderVisible(true);
    }

    previousPathname.current = pathname;
  }, [pathname]);

  if (pathname === "/") return children;

  const isPageReady = readyPath === pathname;
  const isHeaderReady =
    headerReadyPath === pathname ||
    (headerReadyPath !== null && currentPage !== null);
  const isVisible =
    isPageReady && (phase === "idle" || phase === "entering");
  const transition =
    phase === "waiting"
      ? routeTransition.hold
      : phase === "exiting"
        ? routeTransition.exit
        : routeTransition.enter;

  return (
    <SiteNavigationContext.Provider value={navigation}>
      {currentPage && isHeaderMounted ? (
        <motion.div
          className="site-header-frame site-shell"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isHeaderReady && isHeaderVisible ? 1 : 0,
          }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : isHeaderVisible
                ? routeTransition.enter
                : routeTransition.headerExit
          }
          onAnimationComplete={handleHeaderAnimationComplete}
        >
          <SiteHeader currentPage={currentPage} />
        </motion.div>
      ) : null}

      <motion.div
        className="route-transition"
        data-transitioning={phase !== "idle"}
        initial={{ opacity: 0 }}
        animate={{
          opacity: isVisible ? 1 : 0,
        }}
        transition={shouldReduceMotion ? { duration: 0 } : transition}
        onAnimationComplete={handleAnimationComplete}
      >
        {children}
      </motion.div>

      <motion.div
        className="route-transition-veil"
        data-visible={isDetailVeilVisible ? "true" : "false"}
        aria-hidden="true"
        initial={false}
        animate={{ opacity: isDetailVeilVisible ? 1 : 0 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : isDetailVeilVisible
              ? { duration: 0 }
              : routeTransition.enter
        }
      />
    </SiteNavigationContext.Provider>
  );
};
