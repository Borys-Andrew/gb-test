import SearchIcon from "../../../../assets/icons/search-icon.svg?react";
import { IconButton } from "@/components/iconButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import clsx from "clsx";
import React, { useCallback, useEffect, useRef, useState } from "react";

type TableBulkActionsProps = {
  searchedValue: string;
  pageRange: number[];
  onSetSearchedValue: (value: string) => void;
  onPageSizeChange: (size: number) => void;
  onPrint?: () => void;
  onExport?: () => void;
};
export const TableBulkActions = ({
  searchedValue = "",
  pageRange,
  onSetSearchedValue,
  onPageSizeChange,
  onPrint,
  onExport,
}: TableBulkActionsProps) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [localSearchValue, setLocalSearchValue] = useState(searchedValue);
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setLocalSearchValue(searchedValue);
  }, [searchedValue]);

  const handleClickOutside = useRef<((event: MouseEvent) => void) | null>(null);

  useEffect(() => {
    handleClickOutside.current = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchVisible(false);
      }
    };
    if (isSearchVisible) {
      document.addEventListener("mousedown", handleClickOutside.current);
    }

    return () => {
      if (handleClickOutside.current) {
        document.removeEventListener("mousedown", handleClickOutside.current);
      }
    };
  }, [isSearchVisible]);

  const debounceSearch = useCallback(() => {
    if (localSearchValue !== searchedValue) {
      onSetSearchedValue(localSearchValue);
    }
  }, [localSearchValue, searchedValue, onSetSearchedValue]);

  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(debounceSearch, 300);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [localSearchValue, debounceSearch]);

  return (
    <div className="flex items-center gap-[30px]">
      <div className="flex items-center" ref={searchRef}>
        {!isSearchVisible && (
          <IconButton
            icon={<SearchIcon />}
            tooltip="Search contact"
            onClick={() => setIsSearchVisible((prev) => !prev)}
          />
        )}
        <div
          className={clsx(
            "transition-all duration-300 ease-in-out overflow-hidden",
            isSearchVisible ? "opacity-100 w-[200px]" : "opacity-0 w-0",
          )}
        >
          <Input
            type="search"
            placeholder="Search..."
            value={localSearchValue}
            onChange={(e) => setLocalSearchValue(e.target.value)}
            className="transition-all duration-300 ease-in-out"
          />
        </div>
      </div>
      <div className="flex items-center gap-2.5">
        <span>Show</span>
        <Select
          defaultValue={String(pageRange[1])}
          onValueChange={(value) => onPageSizeChange(+value)}
        >
          <SelectTrigger className="border-none shadow-none cursor-pointer outline-none">
            <SelectValue placeholder="5" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {pageRange.map((el: number) => (
              <SelectItem
                key={el}
                value={`${el}`}
                className="cursor-pointer hover:bg-[var(--select-hover)]"
              >
                {el}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        onClick={onPrint}
        variant="ghost"
        className="hover:bg-[var(--button-icon-hover)] active:bg-[var(--button-icon-active)] transition-all ease-in-out cursor-pointer"
      >
        Print
      </Button>
      <Button
        onClick={onExport}
        variant="ghost"
        className="hover:bg-[var(--button-icon-hover)] active:bg-[var(--button-icon-active)] transition-all ease-in-out cursor-pointer"
      >
        Export
      </Button>
    </div>
  );
};
