import { iconButtons } from "../constants";
import { IconButton } from "../iconButton";
import React from "react";

export const Header = () => {
  return (
    <header className="w-full">
      <div className="flex items-center justify-between py-[18px]">
        <div className="flex items-center gap-8">
          <div className="h-8 w-8 bg-[var(--image-bg)]" />
          <span>Hi kate!</span>
        </div>

        <nav>
          <ul className="flex gap-4">
            {iconButtons.map(({ name, icon }) => (
              <li key={name}>
                <IconButton tooltip={name} icon={icon} />
              </li>
            ))}
            <li>
              <div className="h-8 w-8 bg-[var(--image-bg)] rounded-full" />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
