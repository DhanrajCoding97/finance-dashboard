import { Button } from '@/components/ui/button';
import { ArrowUpDown, Trash } from 'lucide-react';

export const columns = (dispatch) => [
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const date = new Date(row.getValue('date'));
      return date.toLocaleDateString('en-IN');
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.getValue('type');

      return (
        <span
          className={`px-2 py-1 rounded text-xs ${
            type === 'income'
              ? 'bg-green-100 text-green-600'
              : 'bg-red-100 text-red-600'
          }`}
        >
          {type}
        </span>
      );
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Amount <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = row.getValue('amount');

      return (
        <div className='font-medium pl-2.75'>
          ₹{amount.toLocaleString('en-IN')}
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const id = row.original.id;

      return (
        <Button
          variant='ghost'
          size='icon'
          onClick={() => dispatch({ type: 'DELETE_TRANSACTION', payload: id })}
          className='w-full flex items-end'
        >
          <Trash className='h-4 w-4 text-red-500' />
        </Button>
      );
    },
  },
];
