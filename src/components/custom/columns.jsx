"use client";
import { Button } from "../ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Cloud, Server } from "lucide-react";
import { ImBlocked } from "react-icons/im";

// camera table columns here
export const cameraTableColumns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "NAME",
    cell: ({ row }) => (
      <div className="text-gray-600 text-[13px] flex items-center gap-x-2">
        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
        <span>{`${row?.original?.name || "N/A"}`}</span>
      </div>
    ),
  },
  {
    accessorKey: "health",
    header: "HEALTH",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        <div className="flex items-center gap-x-1">
          <Cloud size={14} className="text-gray-400" />
          {/* <!-- Circular Progress --> */}
          <div className="relative size-4">
            <svg
              className="size-full -rotate-90"
              viewBox="0 0 36 36"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* <!-- Background Circle --> */}
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                className="stroke-current text-gray-200 dark:text-neutral-700"
                stroke-width="4"
              ></circle>
              {/* <!-- Progress Circle --> */}A
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className="stroke-current text-orange-500 dark:text-blue-500"
                stroke-width="4"
                stroke-dasharray="100"
                stroke-dashoffset="25"
                stroke-linecap="round"
              ></circle>
            </svg>
            <span className="text-gray-600 text-[8px] absolute -bottom-[1.2px] left-[5px]">{`${row?.original?.health?.cloud}`}</span>
          </div>
        </div>
        <div className="flex items-center gap-x-1">
          <Server size={14} className="text-gray-400" />
          <div className="relative size-4">
            <svg
              className="size-full -rotate-90"
              viewBox="0 0 36 36"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* <!-- Background Circle --> */}
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                className="stroke-current text-gray-200 dark:text-neutral-700"
                stroke-width="4"
              ></circle>
              {/* <!-- Progress Circle --> */}A
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className="stroke-current text-green-600 dark:text-blue-500"
                stroke-width="4"
                stroke-dasharray="100"
                stroke-dashoffset="25"
                stroke-linecap="round"
              ></circle>
            </svg>
            <span className="text-gray-600 text-[8px] absolute -bottom-[1.2px] left-[5px]">{`${row?.original?.health?.device}`}</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "location",
    header: "LOCATION",
    cell: ({ row }) => (
      <span className="text-gray-600 text-[13px]">
        {`${row?.original?.location || "N/A"}`}
      </span>
    ),
  },
  {
    accessorKey: "recorder",
    header: "RECORDER",
    cell: ({ row }) => (
      <span className="text-gray-600 text-[13px]">
        {`${row?.original?.recorder || "N/A"}`}
      </span>
    ),
  },
  {
    accessorKey: "tasks",
    header: "TASKS",
    cell: ({ row }) => (
      <span className="text-gray-600 text-[13px]">
        {`${row?.original?.tasks} tasks`}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => (
      <Button
        className={cn(
          "text-xs font-semibold rounded-sm p-2 py-1 shadow-sm",
          row?.original?.status === "Active"
            ? "text-green-600 bg-green-50 hover:bg-green-100"
            : "text-gray-500 bg-gray-200 hover:bg-gray-300"
        )}
        size="xs"
      >
        {row?.original?.status}
      </Button>
    ),
  },
  {
    accessorKey: "actions",
    header: "ACTIONS",
    cell: () => (
      <Button variant={"ghost"} size="sm" className="">
        <ImBlocked className="text-gray-500" />
      </Button>
    ), // Custom Cell Rendering
  },
];
