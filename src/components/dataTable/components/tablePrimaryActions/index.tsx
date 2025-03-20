import { PrimaryButton } from "@/components";
import React from "react";

type TablePrimaryActionsProps = {
  actionedTotal?: number;
  itemsToDelete?: number;
  onActioned?: () => void;
  onCreate?: () => void;
  onDelete?: () => void;
  onPreview?: () => void;
};

export const TablePrimaryActions = ({
  actionedTotal = 20,
  itemsToDelete,
  onActioned,
  onCreate,
  onDelete,
  onPreview,
}: TablePrimaryActionsProps) => {
  const isActionedActive = itemsToDelete === 0 ? true : false;
  const isDeleteActive = itemsToDelete !== 0;

  return (
    <div className="flex gap-8">
      <PrimaryButton
        onClick={onActioned}
        title="Actioned"
        total={actionedTotal}
        isActive={isActionedActive}
      />
      <PrimaryButton onClick={onCreate} title="Add" />
      <PrimaryButton
        onClick={onDelete}
        title="Delete"
        total={itemsToDelete}
        isActive={isDeleteActive}
      />
      <PrimaryButton onClick={onPreview} title="Preview Quotes" />
    </div>
  );
};
