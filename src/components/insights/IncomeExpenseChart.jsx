import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { fmtK, fmt } from '../../lib/helper';

const chartConfig = {
  income: { label: 'Income', color: '#1D9E75' },
  expense: { label: 'Expenses', color: '#E24B4A' },
};

export default function IncomeExpenseChart({ data }) {
  return (
    <Card className='lg:col-span-3'>
      <CardHeader className='pb-2'>
        <CardTitle className='text-xs font-medium text-muted-foreground uppercase tracking-wider'>
          Income vs Expenses — Last 6 Months
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className='h-[220px] w-full'>
          <BarChart data={data} barGap={4}>
            <CartesianGrid vertical={false} stroke='rgba(128,128,128,0.08)' />
            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: 'rgba(128,128,128,0.7)' }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: 'rgba(128,128,128,0.7)' }}
              tickFormatter={fmtK}
            />
            <ChartTooltip
              content={<ChartTooltipContent formatter={(v) => fmt(v)} />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey='income'
              fill='var(--color-income)'
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
            <Bar
              dataKey='expense'
              fill='var(--color-expense)'
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
