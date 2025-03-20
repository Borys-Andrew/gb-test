import { navigationButtons } from "../constants";
import { NavigationButton } from "../navigationButton";
import { cn } from "@/lib/utils";
import React from "react";

type NavigationPanelProps = {
  className?: string;
};

export const NavigationPanel = ({ className }: NavigationPanelProps) => {
  return (
    <ul className={cn("w-full flex py-3 overflow-x-auto", className)}>
      {navigationButtons.map(({ title, icon }, index) => (
        <li key={title}>
          <NavigationButton title={title} icon={icon} isActive={index === 1} />
        </li>
      ))}
    </ul>
  );
};
