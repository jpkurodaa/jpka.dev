"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { NAV_ITEMS } from "@/lib/constants";

type NavLink =
  | { type: "hash"; id: string; label: string }
  | { type: "page"; href: string; label: string };

const ALL_NAV: NavLink[] = [
  ...NAV_ITEMS.map((item) => ({
    type: "hash" as const,
    id: item.id,
    label: item.label,
  })),
  { type: "page", href: "/blog", label: "Blog" },
];

export default function Navigation() {
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const getHref = (item: NavLink) =>
    item.type === "hash" ? `#${item.id}` : item.href;

  return (
    <AnimatePresence>
      {visible && (
        <m.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-50 border-b border-ash/50 bg-void/80 backdrop-blur-md"
        >
          <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
            <a
              href="#hero"
              className="font-display text-sm font-bold tracking-wider text-bone"
            >
              JPKA
            </a>

            {/* Desktop */}
            <ul className="hidden gap-8 sm:flex">
              {ALL_NAV.map((item) => (
                <li key={item.label}>
                  <a
                    href={getHref(item)}
                    className="text-xs uppercase tracking-[0.2em] text-smoke transition-colors hover:text-gold"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex flex-col gap-1.5 sm:hidden"
              aria-label="Toggle menu"
            >
              <span
                className={`h-px w-5 bg-bone transition-transform ${
                  mobileOpen ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-5 bg-bone transition-opacity ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-px w-5 bg-bone transition-transform ${
                  mobileOpen ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {mobileOpen && (
              <m.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden border-t border-ash/50 sm:hidden"
              >
                <ul className="flex flex-col gap-1 p-4">
                  {ALL_NAV.map((item) => (
                    <li key={item.label}>
                      <a
                        href={getHref(item)}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-lg px-4 py-3 text-xs uppercase tracking-[0.2em] text-smoke transition-colors hover:bg-ash/50 hover:text-gold"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </m.div>
            )}
          </AnimatePresence>
        </m.nav>
      )}
    </AnimatePresence>
  );
}
