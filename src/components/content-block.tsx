import { cn } from "@/lib/utils";
import React from "react";

const ContentBlock = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "w-full h-full bg-gray-100 rounded-md shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
};

export default ContentBlock;
