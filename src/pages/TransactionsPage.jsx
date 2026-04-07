import { useState } from 'react';
import { DataTable } from '../components/transactions/data-table';
import { columns } from '../components/transactions/columns';
import { useAppContext } from '../context/AppContext';
import { AddTransaction } from '../components/transactions/AddTransaction';
import { Button } from '@/components/ui/button';

const TransactionsPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTransaction, setEditTransaction] = useState(null); // 👈 add this
  const { state, dispatch } = useAppContext();

  const isAdmin = state.role === 'admin';

  const handleEdit = (transaction) => {
    setEditTransaction(transaction);
    setDialogOpen(true);
  };

  const tableColumns = columns(dispatch, isAdmin, handleEdit);

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
          <Button
            onClick={() => {
              setEditTransaction(null); // 👈 ensure add mode
              setDialogOpen(true);
            }}
          >
            + Add Transaction
          </Button>
        )}
      </div>

      {/* {isAdmin && (
          <Button onClick={() => setDialogOpen(true)}>+ Add Transaction</Button>
        )}
      </div> */}

      {!isAdmin && (
        <div className='text-xs text-muted-foreground bg-muted px-3 py-2 rounded-lg w-fit'>
          Viewer mode — switch to Admin to manage transactions
        </div>
      )}

      {/* <AddTransaction open={dialogOpen} onOpenChange={setDialogOpen} /> */}
      <AddTransaction
        open={dialogOpen}
        onOpenChange={(val) => {
          setDialogOpen(val);
          if (!val) setEditTransaction(null); // 👈 clear on close
        }}
        editTransaction={editTransaction} // 👈 pass this
      />
      <DataTable columns={tableColumns} data={state.transactions} />
    </div>
  );
};

export default TransactionsPage;
