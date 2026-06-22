"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const srOnly: React.CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
};

function parseFontSize(value: unknown, fallback: number): number {
  if (typeof value === "number" && isFinite(value) && value > 0) return value;
  if (typeof value === "string") {
    const n = parseFloat(value);
    if (isFinite(n) && n > 0) return n;
  }
  return fallback;
}

function parseLineHeight(value: unknown, fontSizePx: number, fallback: number): number {
  if (typeof value === "number" && isFinite(value) && value > 0) return value;
  if (typeof value === "string") {
    if (value.endsWith("%")) {
      const n = parseFloat(value);
      if (isFinite(n) && n > 0) return n / 100;
    }
    if (value.endsWith("px")) {
      const n = parseFloat(value);
      if (isFinite(n) && n > 0 && fontSizePx > 0) return n / fontSizePx;
    }
    const n = parseFloat(value);
    if (isFinite(n) && n > 0) return n;
  }
  return fallback;
}

const ITEMS = [
  "compound revenue",
  "cut manual ops",
  "scale without headcount",
  "run while you sleep",
  "pay for itself",
];

const PREFIX_TEXT = "Built to";
const SCREEN_READER_TEXT =
  "Built to compound revenue, cut manual ops, scale without headcount, run while you sleep, pay for itself";
const SCRUB_AMOUNT = 0.7;
const SNAP_DURATION = 0.2;
const SNAP_DELAY = 0.02;
const SNAP_EASE = "power2.inOut";
const GAP = 16;

export function ScrollWordHighlight() {
  const [fontSize, setFontSize] = useState(56);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const next = w < 480 ? 28 : w < 768 ? 38 : 56;
      setFontSize(next);
      ScrollTrigger.refresh();
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const font = {
    fontFamily: "var(--font-display, sans-serif)",
    fontWeight: 600,
    fontSize,
    lineHeight: 1.1,
    letterSpacing: "-0.02em" as const,
  };

  const fontSizePx = parseFontSize(font.fontSize, 56);
  const fontLineHeight = parseLineHeight(font.lineHeight, fontSizePx, 1.1);
  const lineHeightPx = fontSizePx * fontLineHeight;
  const halfLine = lineHeightPx / 2;

  const stickyTop = `calc(50vh - ${halfLine}px)`;

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list || ITEMS.length === 0) return;

    const vpH = window.innerHeight;
    const vpY = vpH / 2;

    const ctx = gsap.context(() => {
      gsap.to(list, {
        y: -(ITEMS.length - 1) * lineHeightPx,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: `top ${vpY - halfLine}px`,
          end: `+=${(ITEMS.length - 1) * lineHeightPx}`,
          scrub: SCRUB_AMOUNT,
        },
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: `top ${vpY - halfLine}px`,
        end: `+=${(ITEMS.length - 1) * lineHeightPx}`,
        snap: {
          snapTo: 1 / (ITEMS.length - 1),
          duration: { min: Math.min(0.2, SNAP_DURATION), max: SNAP_DURATION },
          delay: SNAP_DELAY,
          ease: SNAP_EASE,
          directional: false,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [lineHeightPx, halfLine]);

  return (
    <section
      ref={sectionRef}
      style={{
        width: "100%",
        overflow: "clip",
        backgroundColor: "transparent",
        borderTop: "1px solid var(--color-border)",
        paddingTop: "5rem",
        paddingBottom: "5rem",
        boxSizing: "border-box",
        ...font,
      }}
    >
      {/* container-x equivalent via padding */}
      <div
        style={{
          paddingLeft: "max(1.5rem, calc((100vw - 80rem) / 2 + 1.5rem))",
          paddingRight: "max(1.5rem, calc((100vw - 80rem) / 2 + 1.5rem))",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: GAP,
            boxSizing: "border-box",
            height: ITEMS.length * lineHeightPx,
          }}
        >
          <h2
            style={{
              position: "sticky",
              top: stickyTop,
              margin: 0,
              font: "inherit",
              height: "fit-content",
              flexShrink: 0,
              whiteSpace: "nowrap",
              color: "var(--color-fg)",
            }}
          >
            <span aria-hidden="true">{PREFIX_TEXT}&nbsp;</span>
            <span style={srOnly}>{SCREEN_READER_TEXT}</span>
          </h2>

          <div
            style={{
              overflow: "hidden",
              height: lineHeightPx,
              position: "sticky",
              top: stickyTop,
              flex: 1,
            }}
          >
            <ul
              ref={listRef}
              style={{ listStyle: "none", margin: 0, padding: 0, willChange: "transform" }}
            >
              {ITEMS.map((item, i) => (
                <li
                  key={`${item}-${i}`}
                  style={{ height: lineHeightPx, color: "var(--color-brand)" }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
