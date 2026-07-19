"use client";

import { Aperture, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { TransitionLink } from "@/components/navigation/transition-link";

type SiteHeaderProps = Readonly<{
  currentPage: "Selected Work" | "Information";
}>;

const navItems = [
  { href: "/works", label: "Selected Work", level: "primary" },
  { href: "/information", label: "Information", level: "secondary" },
] as const;

export const SiteHeader = ({ currentPage }: SiteHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((current) => !current);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="site-header">
      <div className="site-header__desktop">
        <TransitionLink className="site-header__brand" href="/">
          Takahashi Mei
        </TransitionLink>
        <nav className="site-header__nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <TransitionLink
              className="site-header__nav-link"
              data-level={item.level}
              href={item.href}
              aria-current={currentPage === item.label ? "page" : undefined}
              key={item.href}
            >
              {item.label}
            </TransitionLink>
          ))}
          <a
            className="site-header__social"
            href="https://www.instagram.com/"
            rel="noreferrer"
            target="_blank"
          >
            Instagram
          </a>
        </nav>
      </div>

      <div className="site-header__mobile">
        <button
          className="site-header__menu-button"
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <X className="icon icon--menu" aria-hidden="true" />
          ) : (
            <Menu className="icon icon--menu" aria-hidden="true" />
          )}
        </button>
        <span className="site-header__current">{currentPage}</span>
        <a
          className="site-header__social"
          href="https://www.instagram.com/"
          aria-label="Instagram"
          rel="noreferrer"
          target="_blank"
        >
          <Aperture className="icon icon--small" aria-hidden="true" />
        </a>
      </div>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.nav
            id="mobile-menu"
            className="mobile-menu"
            data-open="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="mobile-menu__list">
              {navItems.map((item, index) => (
                <motion.li
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06, duration: 0.33 }}
                  key={item.href}
                >
                  <TransitionLink href={item.href} onClick={closeMenu}>
                    {item.label}
                  </TransitionLink>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
};
