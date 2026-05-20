import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
};

export function Container({ children, className = "", narrow }: ContainerProps) {
  const max = narrow ? "max-w-3xl" : "max-w-7xl";
  return (
    <div className={`mx-auto w-full px-5 sm:px-8 lg:px-10 ${max} ${className}`.trim()}>
      {children}
    </div>
  );
}
