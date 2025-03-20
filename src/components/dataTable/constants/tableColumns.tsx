import ChewronDownIcon from "../../../assets/icons/chevron-down-icon.svg?react";
import FilterIcon from "../../../assets/icons/filter-icon.svg?react";
import { User } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

export const tableColumns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={table.getIsAllPageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    id: "customer",
    accessorKey: "customer",
    header: ({ column }) => (
      <div
        className="flex gap-1 items-center justify-start px-0 w-full cursor-pointer"
        onClick={column.getToggleSortingHandler()}
      >
        <span>Customer</span>
        <span>
          {" "}
          {column.getIsSorted() === "asc" ? (
            <ChewronDownIcon className="rotate-180" />
          ) : column.getIsSorted() === "desc" ? (
            <ChewronDownIcon />
          ) : (
            <FilterIcon />
          )}
        </span>
      </div>
    ),
    accessorFn: (row) => `${row.name} ${row.username}`,
    sortingFn: "alphanumeric",
  },
  {
    id: "email",
    accessorKey: "email",
    header: ({ column }) => (
      <div
        className="flex gap-1 items-center justify-start px-0 w-full cursor-pointer"
        onClick={column.getToggleSortingHandler()}
      >
        <span>Email</span>
        <span>
          {column.getIsSorted() === "asc" ? (
            <ChewronDownIcon className="rotate-180" />
          ) : column.getIsSorted() === "desc" ? (
            <ChewronDownIcon />
          ) : (
            <FilterIcon />
          )}
        </span>
      </div>
    ),
    accessorFn: (row) => `${row.email}`,
  },
  {
    id: "phone",
    accessorKey: "phone",
    header: ({ column }) => (
      <div
        className="flex gap-1 items-center justify-start px-0 w-full cursor-pointer"
        onClick={column.getToggleSortingHandler()}
      >
        <span>Phone</span>
        <span>
          {column.getIsSorted() === "asc" ? (
            <ChewronDownIcon className="rotate-180" />
          ) : column.getIsSorted() === "desc" ? (
            <ChewronDownIcon />
          ) : (
            <FilterIcon />
          )}
        </span>
      </div>
    ),
    accessorFn: (row) => `${row.phone}`,
  },
  {
    id: "company",
    accessorKey: "company",
    header: ({ column }) => (
      <div
        className="flex gap-1 items-center justify-start px-0 w-full cursor-pointer"
        onClick={column.getToggleSortingHandler()}
      >
        <span>Company</span>
        <span>
          {column.getIsSorted() === "asc" ? (
            <ChewronDownIcon className="rotate-180" />
          ) : column.getIsSorted() === "desc" ? (
            <ChewronDownIcon />
          ) : (
            <FilterIcon />
          )}
        </span>
      </div>
    ),
    accessorFn: (row) => `${row.company?.name}`,
  },
  // {
  //   id: "delivery",
  //   accessorKey: "delivery",
  //   header: ({ column }) => (
  //     <div
  //       className="flex gap-1 items-center justify-start px-0 w-full cursor-pointer"
  //       onClick={column.getToggleSortingHandler()}
  //     >
  //       <span>Delivery</span>
  //       <span>
  //         {" "}
  //         {column.getIsSorted() === "asc" ? (
  //           <ChewronDownIcon className="rotate-180" />
  //         ) : column.getIsSorted() === "desc" ? (
  //           <ChewronDownIcon />
  //         ) : (
  //           <FilterIcon />
  //         )}
  //       </span>
  //     </div>
  //   ),
  //   accessorFn: (row) =>
  //     `${row.address?.street} ${row.address?.city} ${row.address?.zipcode}`,
  // },
  {
    id: "delivery",
    accessorKey: "delivery",
    header: ({ column }) => (
      <div
        className="flex gap-1 items-center justify-start px-0 w-full cursor-pointer"
        onClick={column.getToggleSortingHandler()}
      >
        <span>Delivery</span>
        <span>
          {" "}
          {column.getIsSorted() === "asc" ? (
            <ChewronDownIcon className="rotate-180" />
          ) : column.getIsSorted() === "desc" ? (
            <ChewronDownIcon />
          ) : (
            <FilterIcon />
          )}
        </span>
      </div>
    ),
    accessorFn: (row) => (
      <>
        <span>{row.address?.street}</span>
        <br />
        <span>{row.address?.city}</span>
        <br />
        <span>{row.address?.zipcode}</span>
      </>
    ),
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return <div style={{ whiteSpace: "pre-wrap" }}>{value}</div>;
    },
  },
  {
    id: "website",
    accessorKey: "website",
    header: ({ column }) => (
      <div
        className="flex gap-1 items-center justify-start px-0 w-full cursor-pointer"
        onClick={column.getToggleSortingHandler()}
      >
        <span>Website</span>
        <span>
          {" "}
          {column.getIsSorted() === "asc" ? (
            <ChewronDownIcon className="rotate-180" />
          ) : column.getIsSorted() === "desc" ? (
            <ChewronDownIcon />
          ) : (
            <FilterIcon />
          )}
        </span>
      </div>
    ),
    accessorFn: (row) => `${row.website}`,
  },
];
