import { useMemo } from 'react';
import { useAppContext } from '@/context/AppContext';
import { TrendingUp, TrendingDown, Wallet, ReceiptText } from 'lucide-react';

import MetricCard from '@/components/insights/MetricCard';
import IncomeExpenseChart from '@/components/insights/IncomeExpenseChart';
import ExpenseBreakdownChart from '@/components/insights/ExpenseBreakdownChart';
import CategoryBars from '@/components/insights/CategoryBars';
import MonthlySummary from '@/components/insights/MonthlySummary';
import SavingsTrendChart from '@/components/insights/SavingsTrendChart';

import { fmt, CATEGORY_COLORS, MONTHS_SHORT } from '../lib/helper';

export default function InsightsPage() {
  const { state } = useAppContext();
  const { transactions } = state;

  // ── Totals ─────────────────────────────────────────────────────────────────
  const { totalIncome, totalExpenses, netSavings, savingsRate, txCount } =
    useMemo(() => {
      const inc = transactions
        .filter((t) => t.type === 'income')
        .reduce((s, t) => s + t.amount, 0);
      const exp = transactions
        .filter((t) => t.type === 'expense')
        .reduce((s, t) => s + t.amount, 0);
      return {
        totalIncome: inc,
        totalExpenses: exp,
        netSavings: inc - exp,
        savingsRate: inc > 0 ? Math.round(((inc - exp) / inc) * 100) : 0,
        txCount: transactions.length,
      };
    }, [transactions]);

  // ── Last 6 months income vs expense ────────────────────────────────────────
  const monthlyChartData = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const income = transactions
        .filter((t) => t.type === 'income' && t.date?.startsWith(key))
        .reduce((s, t) => s + t.amount, 0);
      const expense = transactions
        .filter((t) => t.type === 'expense' && t.date?.startsWith(key))
        .reduce((s, t) => s + t.amount, 0);
      return { month: MONTHS_SHORT[d.getMonth()], income, expense };
    });
  }, [transactions]);

  // ── Savings trend ───────────────────────────────────────────────────────────
  const savingsChartData = useMemo(() => {
    return monthlyChartData.map(({ month, income, expense }) => ({
      month,
      savings: income > 0 ? Math.round(((income - expense) / income) * 100) : 0,
    }));
  }, [monthlyChartData]);

  // ── Category breakdown ──────────────────────────────────────────────────────
  const categoryData = useMemo(() => {
    const map = {};
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        map[t.category] = (map[t.category] || 0) + t.amount;
      });
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .map(([name, value]) => ({
        name,
        value,
        fill: CATEGORY_COLORS[name] || '#888780',
      }));
  }, [transactions]);

  // ── Monthly summary ─────────────────────────────────────────────────────────
  const monthlySummary = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 4 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const inc = transactions
        .filter((t) => t.type === 'income' && t.date?.startsWith(key))
        .reduce((s, t) => s + t.amount, 0);
      const exp = transactions
        .filter((t) => t.type === 'expense' && t.date?.startsWith(key))
        .reduce((s, t) => s + t.amount, 0);
      return {
        label: `${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`,
        net: inc - exp,
      };
    });
  }, [transactions]);

  return (
    <div className='p-6 space-y-5 max-w-7xl mx-auto'>
      {/* Header */}
      <div className='mb-2'>
        <h1 className='text-2xl font-semibold tracking-tight'>Insights</h1>
        <p className='text-sm text-muted-foreground mt-1'>
          Your financial overview at a glance
        </p>
      </div>

      {/* Metric cards */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-3'>
        <MetricCard
          label='Total income'
          value={fmt(totalIncome)}
          sub='this period'
          subPositive={true}
          icon={TrendingUp}
          iconColor='#1D9E75'
        />
        <MetricCard
          label='Total expenses'
          value={fmt(totalExpenses)}
          sub='this period'
          subPositive={false}
          icon={TrendingDown}
          iconColor='#E24B4A'
        />
        <MetricCard
          label='Net savings'
          value={fmt(netSavings)}
          sub={`${savingsRate}% savings rate`}
          subPositive={netSavings >= 0}
          icon={Wallet}
          iconColor='#378ADD'
        />
        <MetricCard
          label='Transactions'
          value={txCount}
          sub='total recorded'
          subPositive={true}
          icon={ReceiptText}
          iconColor='#7F77DD'
        />
      </div>

      {/* Income vs Expense + Donut */}
      <div className='grid grid-cols-1 lg:grid-cols-5 gap-4'>
        <IncomeExpenseChart data={monthlyChartData} />
        <ExpenseBreakdownChart data={categoryData} />
      </div>

      {/* Category bars + Monthly summary + Savings trend */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        <CategoryBars data={categoryData} />
        <MonthlySummary data={monthlySummary} />
        <SavingsTrendChart data={savingsChartData} />
      </div>
    </div>
  );
}
