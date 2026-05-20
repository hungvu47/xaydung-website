import type { ReactNode } from "react";

export function InnerMain({ children }: { children: ReactNode }) {
  return <div className="pt-[88px] lg:pt-[96px]">{children}</div>;
}
