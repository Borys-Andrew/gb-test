import ChevroneIcon from "../../assets/icons/chevron-down-icon.svg?react";
import { Button } from "../ui/button";
import { TableActionsPanel } from "./components";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { User } from "@/types";
// import { generateNextUserId } from "@/utils";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo, useState } from "react";

type DataTableProps<User, TValue> = {
  columns: ColumnDef<User, TValue>[];
  data: User[];
};

export const DataTable = ({ columns, data }: DataTableProps<User, User[]>) => {
  const [tableData, setTableData] = useState<User[]>(data);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [rowSelection, setRowSelection] = useState({});
  const pageRangeToDisplay = [5, 10, 20, 50];
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: pageRangeToDisplay[1],
  });

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      globalFilter: searchValue,
      pagination,
    },
    onGlobalFilterChange: setSearchValue,
    globalFilterFn: (row, columnId, filterValue) => {
      const cellValue = row.getValue(columnId);

      return String(cellValue)
        .toLowerCase()
        .includes(String(filterValue).toLowerCase());
    },
    enableRowSelection: true,
    enableMultiRowSelection: true,
  });

  // const handleAddRow = () => {
  //   const newUser: User = {
  //     id: generateNextUserId(tableData),
  //     name: "New",
  //     username: "User",
  //     email: "new.user@example.com",
  //     phone: "000-000-0000",
  //     website: "newuser.com",
  //   };
  //   setTableData([newUser, ...tableData]);
  // };

  const handleDeleteSelectedRows = () => {
    const selectedIds = new Set(selectedRows.map((row) => row.original.id));
    const filteredData = tableData.filter((item) => !selectedIds.has(item.id));
    setTableData(filteredData);
    setRowSelection({});
  };

  const selectedRows = table.getSelectedRowModel().rows;
  const totalPages = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex;
  const filteredRows = table.getFilteredRowModel().rows;
  const totalResults = filteredRows.length;
  const isTotalResults = searchValue && !!totalResults;

  const paginationRange = useMemo(() => {
    const delta = 2;
    const range = [];
    for (let i = 0; i < totalPages; i++) {
      if (
        i === 0 ||
        i === totalPages - 1 ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      } else if (range[range.length - 1] !== "...") {
        range.push("...");
      }
    }
    return range;
  }, [totalPages, currentPage]);

  const handlePageSizeChange = (size: number) => {
    setPagination((prev) => ({ ...prev, pageSize: size, pageIndex: 0 }));
  };

  return (
    <div className="flex flex-col gap-6">
      <TableActionsPanel
        itemsToDelete={selectedRows.length}
        onDelete={handleDeleteSelectedRows}
        searchedValue={searchValue}
        onSetSearchedValue={setSearchValue}
        pageRange={pageRangeToDisplay}
        onPageSizeChange={handlePageSizeChange}
      />
      <div className="max-h-[calc(100vh-250px)] flex flex-col items-center justify-between gap-5">
        <div className="overflow-y-auto w-full">
          <Table className="fixed-table w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className={`px-2 py-1 ${
                        header.id === "select"
                          ? "w-[40px] min-w-[40px]"
                          : "min-w-fit w-[200px] overflow-hidden text-ellipsis"
                      }`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={row.index % 2 === 0 ? "bg-[#EFEFEF]" : ""}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          "px-2 py-1 text-ellipsis overflow-hidden",
                          cell.column.id === "select" && "max-w-fit",
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="relativew-full flex items-center justify-center space-x-2 py-4 bottom-0">
          {isTotalResults && (
            <span className="absolute left-[50px]">
              Results: {totalResults}
            </span>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="rounded-full cursor-pointer"
          >
            <ChevroneIcon className="rotate-90" />
          </Button>

          {paginationRange.map((page, index) =>
            typeof page === "number" ? (
              <Button
                key={index}
                variant={pagination.pageIndex === page ? "default" : "ghost"}
                size="sm"
                onClick={() => table.setPageIndex(page)}
                className={cn(
                  "px-3 py-1 font-light cursor-pointer rounded-full",
                  pagination.pageIndex === page && "font-bold",
                )}
              >
                {page + 1}
              </Button>
            ) : (
              <span key={index} className="px-2">
                {page}
              </span>
            ),
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="rounded-full cursor-pointer"
          >
            <ChevroneIcon className="rotate-270" />
          </Button>
        </div>
      </div>
    </div>
  );
};
