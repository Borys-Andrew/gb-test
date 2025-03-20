import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { cn } from "@/lib/utils";
import { ReactElement } from "react";
import React from "react";

type IconButtonProps = {
  icon: ReactElement;
  className?: string;
  tooltip: string;
  link?: string;
  onClick?: () => void;
};

export const IconButton = ({
  icon,
  className,
  onClick,
  tooltip,
}: IconButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button
            size="icon"
            className={cn(
              "bg-transparent rounded-full hover:bg-[var(--button-icon-hover)] active:bg-[var(--button-icon-active)] transition-all ease-in-out cursor-pointer group shadow-none",
              className,
            )}
            onClick={onClick}
          >
            <span className="group-hover:hover:bg-[var(--button-icon-hover)]">
              {icon}
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
