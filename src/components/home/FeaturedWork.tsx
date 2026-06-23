"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { ArrowUpRight, ExternalLink, Mic, Bot, Megaphone, Truck, Target, Search } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Skeleton } from "@/components/ui/skeleton";

type WorkItem = {
  no: string;
  client: string;
  industry: string;
  headline: string;
  highlights: string[];
  impact: { metric: string; label: string }[];
  gradient: string;
  image?: string;
  icon: React.ElementType;
  badge?: string;
  openSource?: boolean;
};

const workItems: WorkItem[] = [
  {
    no: "01",
    client: "Southwest Gases",
    industry: "Energy & Utilities",
    headline: "AI Voice Agent That Handles Inbound Calls & Instantly Follows Up New Leads",
    icon: Mic,
    highlights: [
      "Answers inbound calls 24/7, first ring every time",
      "Auto-calls new leads within seconds of enquiry",
      "Captures and structures every lead's data automatically",
      "Logs call summaries — no manual note entry needed",
    ],
    impact: [
      { metric: "<60s", label: "follow-up time (was ~4 hours)" },
      { metric: "100%", label: "follow-up consistency" },
      { metric: "0", label: "manual call notes entered" },
    ],
    gradient: "from-violet-500/35 via-fuchsia-500/20 to-cyan-500/25",
    image: "/proj-southwest-voice.jpeg",
  },
  {
    no: "02",
    client: "GoHappy Club",
    industry: "Senior Wellness · D2C",
    headline: "AI Assistant Built For India's Senior Citizen Community",
    icon: Bot,
    highlights: [
      "Understands Hinglish and 5 other Indian languages",
      "Smart semantic caching for sub-50ms repeat responses",
      "Human escalation when genuinely uncertain",
      "Auto-filters spam and forwarded content",
    ],
    impact: [
      { metric: "70%+", label: "cache hit rate" },
      { metric: "~60%", label: "lower LLM inference cost" },
      { metric: "<50ms", label: "response time on cached queries" },
    ],
    gradient: "from-cyan-500/35 via-teal-500/20 to-violet-500/25",
    image: "/proj-gohappy.jpeg",
  },
  {
    no: "03",
    client: "Marketing Agencies",
    industry: "Marketing & Media",
    headline: "Launch Complete Marketing Campaigns From A Single Input",
    icon: Megaphone,
    highlights: [
      "Generates ad copy across all major platforms",
      "Creates personalised customer email sequences",
      "Produces WhatsApp broadcast campaigns",
      "Generates push notification variants with A/B splits",
    ],
    impact: [
      { metric: "<15 min", label: "campaign creation (was ~2 days)" },
      { metric: "6+", label: "channels covered from one brief" },
      { metric: "100%", label: "consistent brand voice, every time" },
    ],
    gradient: "from-violet-500/30 via-cyan-500/20 to-fuchsia-500/25",
    image: "/proj-marketing.jpeg",
  },
  {
    no: "04",
    client: "Southwest Gases",
    industry: "Energy & Utilities",
    headline: "Real-Time Delivery Operations Without Endless Phone Calls",
    icon: Truck,
    highlights: [
      "Manage all delivery routes from one central portal",
      "Push live status updates to drivers instantly",
      "Weekly delivery performance summaries auto-generated",
      "Full operational change history and audit trail",
    ],
    impact: [
      { metric: "0", label: "daily ops coordination calls needed" },
      { metric: "100%", label: "route visibility in real time" },
      { metric: "Full", label: "audit trail of every change made" },
    ],
    gradient: "from-fuchsia-500/25 via-violet-500/20 to-cyan-500/20",
    image: "/proj-southwest-delivery.jpeg",
  },
  {
    no: "05",
    client: "Multi-Client Deployment",
    industry: "B2B SaaS & Agencies",
    headline: "Fully Automated Lead Generation & Outreach Engine",
    icon: Target,
    highlights: [
      "Finds and qualifies leads without human input",
      "Enriches each prospect with contextual data",
      "Sends personalised outreach at scale",
      "AI voice agents follow up hot leads automatically",
    ],
    impact: [
      { metric: "100%", label: "automated top-of-funnel prospecting" },
      { metric: "Zero", label: "manual prospect research hours" },
      { metric: "$0.11", label: "average cost per verified lead" },
    ],
    gradient: "from-cyan-500/25 via-fuchsia-500/20 to-violet-500/25",
    image: "/proj-multi-client.jpeg",
  },
  {
    no: "06",
    client: "SBA.gov Research Workflow",
    industry: "Government & SMB Data",
    headline: "Automated Discovery Of Hard-To-Find U.S. SMBs",
    icon: Search,
    highlights: [
      "Scrapes SBA listings for registered small businesses",
      "Surfaces hidden businesses not indexed by Google",
      "Extracts websites, socials, and contact details",
      "Outputs clean, structured, ready-to-use lead lists",
    ],
    impact: [
      { metric: "Hours → min", label: "research time per batch" },
      { metric: "1000s", label: "of SMBs found per automated run" },
      { metric: "$0", label: "recurring tool or data cost" },
    ],
    gradient: "from-teal-500/30 via-cyan-500/20 to-violet-500/20",
    image: "/proj-sba.jpeg",
    openSource: true,
  },
];

const CARD_W_MOBILE = "min(82vw, 320px)";
const CARD_W_DESKTOP = "360px";

function WorkCard({ item }: { item: WorkItem }) {
  return (
    <div
      className="relative flex shrink-0 flex-col overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-elev)] transition-colors hover:border-[var(--color-brand)]"
      style={{ width: CARD_W_DESKTOP }}
    >
      <div className={`relative h-[110px] overflow-hidden ${item.image ? "bg-black" : `bg-gradient-to-br ${item.gradient}`}`}>
        {item.image ? (
          <Image src={item.image} alt={item.client} fill className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="absolute inset-0 grid-bg opacity-30" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-elev)]/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-4">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--color-fg-muted)]/80">
              {item.industry}
            </span>
            <div className="mt-0.5 font-display text-sm font-semibold text-[var(--color-fg)]">
              {item.client}
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {item.openSource && (
              <span className="inline-flex items-center gap-1 border border-[var(--color-accent)] bg-[var(--color-bg-elev)] px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.16em] text-[var(--color-accent)]">
                <ExternalLink className="size-2.5" />
                Open Source
              </span>
            )}
            <span className="font-mono text-[10px] font-semibold text-[var(--color-fg-muted)]/60">
              {item.no}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-5">
        <div className="flex items-start gap-2.5">
          <span className="mt-0.5 shrink-0 text-[var(--color-brand)]">
            <item.icon className="size-4" />
          </span>
          <p className="font-display text-[15px] font-semibold leading-snug tracking-tight text-[var(--color-fg)]">
            {item.headline}
          </p>
        </div>

        <ul className="flex flex-col gap-2 border-t border-[var(--color-border)] pt-4">
          {item.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-[12px] leading-snug text-[var(--color-fg-muted)]">
              <span className="mt-1.5 size-1 shrink-0 bg-[var(--color-brand)]" />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-auto grid grid-cols-3 gap-2 border-t border-[var(--color-border)] pt-4">
          {item.impact.map((r) => (
            <div key={r.label} className="flex flex-col gap-0.5">
              <span className="font-display text-base font-semibold leading-none text-[var(--color-brand)]">
                {r.metric}
              </span>
              <span className="text-[9.5px] leading-tight text-[var(--color-fg-subtle)]">
                {r.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div
      className="relative flex shrink-0 flex-col overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-elev)]"
      style={{ width: CARD_W_DESKTOP }}
    >
      <Skeleton className="h-[110px] w-full rounded-none bg-[var(--color-surface)]" />
      <div className="flex flex-1 flex-col gap-5 p-5">
        <div className="flex items-start gap-2.5">
          <Skeleton className="mt-1 size-4 shrink-0 rounded-none bg-[var(--color-surface)]" />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-3 w-full rounded-none bg-[var(--color-surface)]" />
            <Skeleton className="h-3 w-3/4 rounded-none bg-[var(--color-surface)]" />
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t border-[var(--color-border)] pt-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-2.5 w-full rounded-none bg-[var(--color-surface)]" />
          ))}
        </div>
        <div className="mt-auto grid grid-cols-3 gap-2 border-t border-[var(--color-border)] pt-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <Skeleton className="h-5 w-10 rounded-none bg-[var(--color-surface)]" />
              <Skeleton className="h-2 w-full rounded-none bg-[var(--color-surface)]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Desktop: scroll-driven sticky horizontal ── */
function DesktopScroller() {
  const outerRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [ready, setReady] = useState(false);

  const measure = useCallback(() => {
    if (!rowRef.current) return;
    setScrollWidth(rowRef.current.scrollWidth);
    setContainerWidth(rowRef.current.parentElement?.offsetWidth ?? 0);
    setReady(true);
  }, []);

  useEffect(() => {
    const ro = new ResizeObserver(measure);
    if (rowRef.current) ro.observe(rowRef.current);
    measure();
    return () => ro.disconnect();
  }, [measure]);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  const rawX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(scrollWidth - containerWidth)]
  );
  const x = useSpring(rawX, { damping: 60, stiffness: 500, mass: 1 });

  return (
    /* outer: 300vh tall — drives scroll distance */
    <div ref={outerRef} style={{ height: "300vh" }}>
      {/* sticky inner */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div className="container-x">
          <SectionHeader
            eyebrow="Selected work"
            title="Systems we've shipped that moved real business metrics."
            subtitle="Every engagement starts with a number we're trying to move — and ends with the proof we moved it."
          />
        </div>

        {/* card row */}
        <div className="mt-10 overflow-visible pl-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))]">
          <motion.div
            ref={rowRef}
            style={{ x }}
            className="flex gap-5 will-change-transform"
          >
            {!ready
              ? workItems.map((_, i) => <SkeletonCard key={i} />)
              : workItems.map((item) => <WorkCard key={item.no} item={item} />)}
            {/* trailing spacer so last card clears the viewport edge */}
            <div className="shrink-0 w-8" aria-hidden />
          </motion.div>
        </div>

        {/* progress indicator */}
        <div className="container-x mt-8">
          <div className="h-px w-full bg-[var(--color-border)]">
            <motion.div
              className="h-full bg-[var(--color-brand)]"
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
            />
          </div>
          <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-fg-subtle)]">
            Scroll to explore all {workItems.length} case studies
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Mobile: native swipe ── */
function MobileScroller() {
  const [activeIndex, setActiveIndex] = useState(0);
  const rowRef = useRef<HTMLDivElement>(null);

  const onScroll = useCallback(() => {
    const row = rowRef.current;
    if (!row) return;
    const cardW = row.scrollWidth / workItems.length;
    setActiveIndex(Math.round(row.scrollLeft / cardW));
  }, []);

  return (
    <section className="border-t border-[var(--color-border)] py-20">
      <div className="container-x mb-8">
        <SectionHeader
          eyebrow="Selected work"
          title="Systems we've shipped that moved real business metrics."
          subtitle="Every engagement starts with a number we're trying to move — and ends with the proof we moved it."
        />
      </div>

      <div
        ref={rowRef}
        onScroll={onScroll}
        className="flex gap-4 overflow-x-auto px-4 pb-2"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
        } as React.CSSProperties}
      >
        <style>{`.mobile-row::-webkit-scrollbar{display:none}`}</style>
        {workItems.map((item) => (
          <div
            key={item.no}
            style={{
              width: CARD_W_MOBILE,
              minWidth: CARD_W_MOBILE,
              scrollSnapAlign: "center",
            }}
          >
            <WorkCard item={item} />
          </div>
        ))}
        <div className="shrink-0 w-4" aria-hidden />
      </div>

      {/* dots */}
      <div className="mt-4 flex items-center justify-center gap-1.5">
        {workItems.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to project ${i + 1}`}
            onClick={() => {
              const row = rowRef.current;
              if (!row) return;
              const cardW = row.scrollWidth / workItems.length;
              row.scrollTo({ left: i * cardW, behavior: "smooth" });
            }}
            className={`h-1.5 transition-all duration-300 ${
              i === activeIndex
                ? "w-5 bg-[var(--color-brand)]"
                : "w-1.5 bg-[var(--color-border)]"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

/* ── Root export ── */
export function FeaturedWork() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (isDesktop === null) return null; // avoid hydration mismatch

  return isDesktop ? <DesktopScroller /> : <MobileScroller />;
}
