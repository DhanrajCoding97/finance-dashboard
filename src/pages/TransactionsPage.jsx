import { DataTable } from '../components/transactions/data-table';
import { columns } from '@/components/transactions/columns';
import { useAppContext } from '@/context/AppContext';
import { AddTransaction } from '@/components/transactions/addTransaction';
const TransactionsPage = () => {
  const { state, dispatch } = useAppContext();
  const tableColumns = columns(dispatch);
  return (
    <div className='p-4'>
      <h2 className='text-xl font-semibold mb-4'>Transactions</h2>
      <AddTransaction />
      <DataTable columns={tableColumns} data={state.transactions} />
    </div>
  );
};

export default TransactionsPage;
