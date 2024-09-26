import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search, Wifi } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DataTable({ columns, data, heading, desc }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  // Handle location filter
  const handleLocationChange = (location) => {
    setColumnFilters((prev) => [
      ...prev.filter((filter) => filter.id !== "location"),
      location ? { id: "location", value: location } : {},
    ]);
  };

  // Handle status filter
  const handleStatusChange = (status) => {
    setColumnFilters((prev) => [
      ...prev.filter((filter) => filter.id !== "status"),
      status ? { id: "status", value: status } : {},
    ]);
  };

  return (
    <div>
      {/* heading and search container */}
      <div className="flex items-end justify-between">
        <div>
          <h3 className="text-2xl font-medium">{heading || ""}</h3>
          <p className="text-gray-600 text-sm mt-1">{desc || ""}</p>
        </div>
        <div className="flex items-center justify-end py-4 relative">
          <Input
            placeholder="search"
            value={table.getColumn("name")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="w-52 bg-gray-100"
          />
          <Search className="size-4 absolute text-gray-600 right-2" />
        </div>
      </div>

      {/* Filter containers */}
      <div className="filter-container flex items-center gap-x-3 mt-4 mb-2">
        {/* Location filter */}
        <Select onValueChange={handleLocationChange}>
          <SelectTrigger className="w-[180px] h-8 text-gray-500">
            <MapPin className="size-4" />
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Locations</SelectLabel>
              {Array.from(new Set(data?.map((d) => d?.location))).map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Status filter */}
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[180px] h-8 text-gray-500">
            <Wifi className="size-4" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Table section */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table?.getHeaderGroups()?.map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
