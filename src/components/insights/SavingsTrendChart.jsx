import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';

const chartConfig = {
  savings: { label: 'Savings %', color: '#378ADD' },
};

export default function SavingsTrendChart({ data }) {
  return (
    <Card>
      <CardHeader className='pb-2'>
        <CardTitle className='text-xs font-medium text-muted-foreground uppercase tracking-wider'>
          Savings Rate Trend
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className='h-[180px] w-full'>
          <LineChart data={data}>
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
              tickFormatter={(v) => `${v}%`}
            />
            <ChartTooltip
              content={<ChartTooltipContent formatter={(v) => `${v}%`} />}
            />
            <Line
              dataKey='savings'
              stroke='var(--color-savings)'
              strokeWidth={2}
              dot={{ r: 3, fill: 'var(--color-savings)' }}
              type='monotone'
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
