import { useState, useMemo } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CATEGORIES } from '@/data/mockData';

export function DataTable({ columns, data }) {
  const [sorting, setSorting] = useState([{ id: 'amount', desc: true }]);
  const [globalFilter, setGlobalFilter] = useState('');

  // Filter states
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Apply filters manually before passing to table
  const filteredData = useMemo(() => {
    return data.filter((t) => {
      if (typeFilter !== 'all' && t.type !== typeFilter) return false;
      if (categoryFilter !== 'all' && t.category !== categoryFilter)
        return false;
      if (dateFrom && t.date < dateFrom) return false;
      if (dateTo && t.date > dateTo) return false;
      return true;
    });
  }, [data, typeFilter, categoryFilter, dateFrom, dateTo]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const hasActiveFilters =
    typeFilter !== 'all' || categoryFilter !== 'all' || dateFrom || dateTo;

  const clearFilters = () => {
    setTypeFilter('all');
    setCategoryFilter('all');
    setDateFrom('');
    setDateTo('');
  };

  return (
    <div>
      {/* search n filters */}
      <div className='flex flex-wrap items-center gap-2 py-4'>
        {/* Search */}
        <Input
          placeholder='Search transactions...'
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className='max-w-xs'
        />

        {/* Spacer */}
        <div className='flex-1' />

        {/* Type Filter */}
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className='w-[130px]'>
            <SelectValue placeholder='Type' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Types</SelectItem>
            <SelectItem value='income'>Income</SelectItem>
            <SelectItem value='expense'>Expense</SelectItem>
          </SelectContent>
        </Select>

        {/* Category Filter */}
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className='w-[150px]'>
            <SelectValue placeholder='Category' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Categories</SelectItem>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Date From */}
        <Input
          type='date'
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className='w-37.5'
        />

        {/* Date To */}
        <Input
          type='date'
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          className='w-37.5'
        />

        {/* Clear Filters — only shown when active */}
        {hasActiveFilters && (
          <Button variant='ghost' size='sm' onClick={clearFilters}>
            Clear filters
          </Button>
        )}
      </div>

      {/* Table */}
      <div className='rounded-md border'>
        <Table className='table-fixed w-full'>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
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
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                  className='h-24 text-center'
                >
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* 📄 Pagination */}
      <div className='flex items-center justify-end space-x-2 py-4'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Prev
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
