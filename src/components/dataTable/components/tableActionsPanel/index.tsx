import { TableBulkActions } from "../tableBulkActions";
import { TablePrimaryActions } from "../tablePrimaryActions";
import React from "react";

type TableActionsPanelProps = {
  actionedTotal?: number;
  itemsToDelete?: number;
  searchedValue: string;
  pageRange: number[];
  onActioned?: () => void;
  onCreate?: () => void;
  onDelete?: () => void;
  onPreview?: () => void;
  onPrint?: () => void;
  onExport?: () => void;
  onSetSearchedValue: (value: string) => void;
  onPageSizeChange: (size: number) => void;
};

export const TableActionsPanel = ({
  actionedTotal,
  itemsToDelete,
  searchedValue = "",
  pageRange,
  onActioned,
  onCreate,
  onDelete,
  onPreview,
  onSetSearchedValue,
  onPageSizeChange,
}: TableActionsPanelProps) => {
  return (
    <div className="w-full flex items-center justify-between gap-5">
      <TablePrimaryActions
        actionedTotal={actionedTotal}
        itemsToDelete={itemsToDelete}
        onActioned={onActioned}
        onCreate={onCreate}
        onDelete={onDelete}
        onPreview={onPreview}
      />
      <TableBulkActions
        searchedValue={searchedValue}
        pageRange={pageRange}
        onSetSearchedValue={onSetSearchedValue}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
};
