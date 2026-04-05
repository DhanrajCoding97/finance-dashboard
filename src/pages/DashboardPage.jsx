import SummaryCards from '@/components/dashboard/SummaryCards';
import BalanceTrend from '@/components/dashboard/BalanceTrend';
const DashboardPage = () => {
  return (
    <div className='flex flex-col gap-4'>
      <SummaryCards />
      <BalanceTrend />
    </div>
  );
};

export default DashboardPage;
