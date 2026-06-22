"use client";

import { usePathname } from "next/navigation";
import { DotGridBackground } from "./DotGridBackground";

export function DotGridWrapper() {
  const pathname = usePathname();
  if (pathname.startsWith("/booklet")) return null;
  return <DotGridBackground />;
}
