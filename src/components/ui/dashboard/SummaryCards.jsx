import {useAppContext} from '@/context/AppContext'
import { calculateSummary, calculateTrend } from '@/lib/helper'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const TrendBadge = ({ value }) => {
  if (value === null) return (
    <span className="text-xs text-muted-foreground">No previous data</span>
  )

  const isPositive = parseFloat(value) >= 0

  return (
    <span className={cn(
      'flex items-center gap-1 text-xs font-medium mt-1',
      isPositive ? 'text-green-600' : 'text-red-500'
    )}>
      {isPositive
        ? <TrendingUp size={12} />
        : <TrendingDown size={12} />
      }
      {isPositive ? '+' : ''}{value}% vs last month
    </span>
  )
}

const SummaryCards = () => {
  const { state } = useAppContext()
  const { transactions } = state

  const { income, expenses, balance } = calculateSummary(transactions)
  const { incomeTrend, expenseTrend, balanceTrend } = calculateTrend(transactions)

  const cards = [
    {
      title: 'Total Balance',
      value: balance,
      color: 'text-blue-600',
      trend: balanceTrend,
    },
    {
      title: 'Income',
      value: income,
      color: 'text-green-600',
      trend: incomeTrend,
    },
    {
      title: 'Expenses',
      value: expenses,
      color: 'text-red-600',
      trend: expenseTrend,
    },
  ]

  return (
    <div className="ml-9 md:ml-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-5 transition hover:shadow-lg border"
          >
            <h3 className="text-sm text-gray-500 dark:text-gray-400">
              {card.title}
            </h3>
            <p className={`text-2xl font-semibold mt-2 ${card.color}`}>
              ₹{card.value.toLocaleString()}
            </p>
            <TrendBadge value={card.trend} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default SummaryCards