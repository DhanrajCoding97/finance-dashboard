import { DataTable } from '../components/transactions/data-table';
import { columns } from '@/components/transactions/columns';
import { useAppContext } from '@/context/AppContext';
import { AddTransaction } from '@/components/transactions/addTransaction';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const TransactionsPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { state, dispatch } = useAppContext();

  const isAdmin = state.role === 'admin';
  const tableColumns = columns(dispatch, isAdmin);

  return (
    <div className='p-4 ml-9 md:ml-0 flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-xl font-semibold text-foreground'>
            Transactions
          </h2>
          <p className='text-sm text-muted-foreground mt-0.5'>
            Browse and manage your activity
          </p>
        </div>

        {isAdmin && (
          <Button onClick={() => setDialogOpen(true)}>+ Add Transaction</Button>
        )}
      </div>

      {!isAdmin && (
        <div className='text-xs text-muted-foreground bg-muted px-3 py-2 rounded-lg w-fit'>
          Viewer mode — switch to Admin to manage transactions
        </div>
      )}

      <AddTransaction open={dialogOpen} onOpenChange={setDialogOpen} />
      <DataTable columns={tableColumns} data={state.transactions} />
    </div>
  );
};

export default TransactionsPage;
