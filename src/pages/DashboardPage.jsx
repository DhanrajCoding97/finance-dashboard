import SummaryCards from '../components/dashboard/SummaryCards';
import BalanceTrend from '../components/dashboard/BalanceTrend';

const DashboardPage = () => {
  return (
    <div className='flex flex-col gap-4'>
      <span className='block py-4 ml-2 text-2xl leading-3.5 font-semibold tracking-wide text-green-900 dark:text-green-600'>
        OverView
      </span>
      <SummaryCards />
      <BalanceTrend />
    </div>
  );
};

export default DashboardPage;
