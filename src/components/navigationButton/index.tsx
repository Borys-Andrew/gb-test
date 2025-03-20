import ShenronDownIcon from "../../assets/icons/chevron-down-icon.svg?react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import React, { ReactElement } from "react";

type NavigationButtonProps = {
  icon: ReactElement;
  title: string;
  navigateTo?: string;
  className?: string;
  isActive?: boolean;
};

export const NavigationButton = ({
  icon,
  title,
  className,
  isActive = false,
}: NavigationButtonProps) => {
  return (
    <Button
      className={cn(
        "flex flex-col min-h-fit w-[149.7px] py-0 px-2.5 items-center gap-3 rounded-sm hover:bg-[var(--button-background)] active:bg-[var(--button-icon-active)] transition-all ease-in-out shadow-none cursor-pointer",
        isActive && "bg-[var(--button-background)]",
        className,
      )}
    >
      <span>{icon}</span>
      <div className="flex items-center">
        <span className="font-light text-sm">{title}</span>
        <ShenronDownIcon />
      </div>
    </Button>
  );
};
