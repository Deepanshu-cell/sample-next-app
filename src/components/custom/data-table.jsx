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
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MapPin,
  Search,
  Wifi,
} from "lucide-react";
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
  const [pageSize, setPageSize] = React.useState(10); // Set initial page size
  const [pagination, setPagination] = React.useState({
    pageIndex: 0, // Start from the first page
    pageSize: 10, // Default page size
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // Ensure pagination row model is applied
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      pagination, // Apply pagination state
    },
    onPaginationChange: setPagination, // Update pagination state
    manualPagination: false, // Enable automatic pagination
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

  // Update page size when limit setter changes
  const handlePageSizeChange = (size) => {
    setPagination((prev) => ({
      ...prev,
      pageSize: Number(size),
    }));
    table.setPageSize(Number(size)); // Dynamically set pageSize in table
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

      {/* Pagination and limit setter */}
      <div className="flex items-center justify-between space-x-2 py-4">
        {/* Rows per page setter */}
        <div className="flex items-center">
          <span className="mr-2 text-sm">Rows per page:</span>
          <Select onValueChange={handlePageSizeChange} value={pageSize}>
            <SelectTrigger className="w-[80px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Pagination controls */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(0)} // Skip to first page
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)} // Skip to last page
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
