import { cn } from "@/lib/utils";

type HeadingProps = {
  children?: React.ReactNode;
  className?: string;
};
export const H1 = ({ children, className }: HeadingProps) => (
  <h1 className={cn("text-3xl font-bold", className)}>{children}</h1>
);

export const H2 = ({ children, className }: HeadingProps) => (
  <h1 className={cn("text-2xl font-bold", className)}>{children}</h1>
);

export const H3 = ({ children, className }: HeadingProps) => (
  <h1 className={cn("text-xl font-bold", className)}>{children}</h1>
);

export const H4 = ({ children, className }: HeadingProps) => (
  <h1 className={cn("text-lg font-semibold", className)}>{children}</h1>
);
