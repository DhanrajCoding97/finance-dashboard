import React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { monthlyTrend } from '@/data/mockData';

// Transforming data to include balance for potential future use
const dataWithBalance = monthlyTrend.map((item) => ({
  ...item,
  balance: item.income - item.expenses,
}));

const chartConfig = {
  income: {
    label: 'Income',
    color: '#22c55e',
  },
  expenses: {
    label: 'Expenses',
    color: '#ef4444',
  },
  balance: {
    label: 'Balance',
    color: '#3b82f6',
  },
};

const BalanceTrend = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Income vs Expenses</CardTitle>
        <CardDescription>6 month trend overview</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-64 w-full'
        >
          <AreaChart
            data={dataWithBalance}
            margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
          >
            {/* 🔥 Gradients */}
            <defs>
              <linearGradient id='incomeGrad' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-income)'
                  stopOpacity={0.3}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-income)'
                  stopOpacity={0}
                />
              </linearGradient>

              <linearGradient id='expenseGrad' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-expenses)'
                  stopOpacity={0.3}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-expenses)'
                  stopOpacity={0}
                />
              </linearGradient>

              <linearGradient id='balanceGrad' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-balance)'
                  stopOpacity={0.3}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-balance)'
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            {/* Grid */}
            <CartesianGrid vertical={false} stroke='var(--border)' />

            {/* X Axis */}
            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 12 }}
            />

            {/* Y Axis */}
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 12 }}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              width={50}
            />

            {/* ✅ FIXED Tooltip (NO formatter!) */}
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(label) => label}
                  indicator='dot'
                  className='rounded-lg border bg-background px-3 py-2 shadow-md'
                />
              }
            />

            {/* Income */}
            <Area
              type='monotone'
              dataKey='income'
              stroke='var(--color-income)'
              strokeWidth={2}
              fill='url(#incomeGrad)'
              dot={false}
              activeDot={{ r: 4 }}
            />

            {/* Expenses */}
            <Area
              type='monotone'
              dataKey='expenses'
              stroke='var(--color-expenses)'
              strokeWidth={2}
              fill='url(#expenseGrad)'
              dot={false}
              activeDot={{ r: 4 }}
            />

            {/* 🔥 Balance (main highlight) */}
            <Area
              type='monotone'
              dataKey='balance'
              stroke='var(--color-balance)'
              strokeWidth={2.5}
              fill='url(#balanceGrad)'
              dot={false}
              activeDot={{ r: 5 }}
            />

            {/* Legend */}
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default BalanceTrend;
