import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { PieChart, Pie, Cell } from 'recharts';
import { useMemo } from 'react';
import { fmt } from '../../lib/helper';

export default function ExpenseBreakdownChart({ data }) {
  const config = useMemo(() => {
    return Object.fromEntries(
      data.map(({ name, fill }) => [name, { label: name, color: fill }]),
    );
  }, [data]);

  return (
    <Card className='lg:col-span-2'>
      <CardHeader className='pb-2'>
        <CardTitle className='text-xs font-medium text-muted-foreground uppercase tracking-wider'>
          Expense Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className='h-[260px] w-full'>
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(v) => fmt(v)}
                  nameKey='name'
                  hideLabel
                />
              }
            />
            <Pie
              data={data}
              dataKey='value'
              nameKey='name'
              cx='50%'
              cy='45%'
              innerRadius='55%'
              outerRadius='75%'
              paddingAngle={2}
            />
            <ChartLegend
              content={<ChartLegendContent nameKey='name' />}
              className='flex-wrap gap-x-3 gap-y-1 text-[11px]'
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
