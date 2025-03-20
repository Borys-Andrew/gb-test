import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import React from "react";

type PrimaryButtonProps = {
  title: string;
  total?: number;
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
};

export const PrimaryButton = ({
  title,
  className,
  total,
  isActive = false,
  onClick,
}: PrimaryButtonProps) => {
  return (
    <Button
      className={cn(
        "px-2 py-3 bg-[var(--button-background)] hover:bg-[var(--button-hover)] hover:text-white text-[14px]  transition-all ease-in-out cursor-pointer",
        isActive && "bg-[var(--button-active)] text-white",
        className,
      )}
      onClick={onClick}
    >
      <span>{title}</span>
      {!!total && <span>{`(${total})`}</span>}
    </Button>
  );
};
