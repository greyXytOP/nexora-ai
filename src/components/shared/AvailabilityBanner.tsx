"use client";

import { useState, useEffect } from "react";
import { X, Zap } from "lucide-react";
import Link from "next/link";

const DISMISS_KEY = "nuvero-banner-q3-2026";

export function AvailabilityBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem(DISMISS_KEY)) setVisible(true);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="relative z-[60] border-b border-[var(--color-brand-strong)] bg-[var(--color-brand)] px-6 py-2">
      <div className="flex items-center justify-center gap-2.5 text-xs font-medium text-white">
        <Zap className="size-3 shrink-0" />
        <span>
          Currently booking <strong>Q3 2026</strong> — 2 client spots remaining.
        </span>
        <Link
          href="/contact"
          className="ml-1 border border-white/40 px-2.5 py-0.5 font-semibold transition-colors hover:bg-white/10"
        >
          Claim yours →
        </Link>
      </div>
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-white/70 hover:text-white"
      >
        <X className="size-3.5" />
      </button>
    </div>
  );
}
