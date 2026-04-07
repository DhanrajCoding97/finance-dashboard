// helper function for summary cards and dashboard charts
export const calculateSummary = (transactions) => {
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expenses;

  return { income, expenses, balance };
};

export const calculateTrend = (transactions) => {
  if (transactions.length === 0)
    return {
      incomeTrend: null,
      expenseTrend: null,
      balanceTrend: null,
    };

  // Use latest transaction date as reference — not today
  const latestDate = transactions.reduce((latest, t) => {
    const d = new Date(t.date);
    return d > latest ? d : latest;
  }, new Date(0));

  const thisMonth = latestDate.getMonth();
  const thisYear = latestDate.getFullYear();

  const lastMonthDate = new Date(thisYear, thisMonth - 1, 1);
  const lastMonth = lastMonthDate.getMonth();
  const lastMonthYear = lastMonthDate.getFullYear();

  const filterByMonth = (month, year) =>
    transactions.filter((t) => {
      const d = new Date(t.date);
      return d.getMonth() === month && d.getFullYear() === year;
    });

  const current = filterByMonth(thisMonth, thisYear);
  const previous = filterByMonth(lastMonth, lastMonthYear);

  const getIncome = (txs) =>
    txs.filter((t) => t.type === 'income').reduce((a, t) => a + t.amount, 0);
  const getExpenses = (txs) =>
    txs.filter((t) => t.type === 'expense').reduce((a, t) => a + t.amount, 0);

  const calcChange = (curr, prev) => {
    if (prev === 0) return null;
    return (((curr - prev) / prev) * 100).toFixed(1);
  };

  return {
    incomeTrend: calcChange(getIncome(current), getIncome(previous)),
    expenseTrend: calcChange(getExpenses(current), getExpenses(previous)),
    balanceTrend: calcChange(
      getIncome(current) - getExpenses(current),
      getIncome(previous) - getExpenses(previous),
    ),
  };
};

export const getMonthlyTrend = (transactions) => {
  const monthMap = {};

  transactions.forEach((t) => {
    const date = new Date(t.date);
    const key = date.toLocaleString('en-IN', {
      month: 'short',
      year: 'numeric',
    });
    const shortKey = date.toLocaleString('en-IN', { month: 'short' });

    if (!monthMap[key]) {
      monthMap[key] = {
        month: shortKey,
        income: 0,
        expenses: 0,
        sortKey: date,
      };
    }

    if (t.type === 'income') {
      monthMap[key].income += t.amount;
    } else {
      monthMap[key].expenses += t.amount;
    }
  });

  return Object.values(monthMap)
    .sort((a, b) => a.sortKey - b.sortKey)
    .map(({ month, income, expenses }) => ({
      month,
      income,
      expenses,
      balance: income - expenses,
    }));
};

//helper constants and functions for insight page charts
export const CATEGORY_COLORS = {
  Food: '#D012F3',
  Housing: '#378ADD',
  Transport: '#EF9F27',
  Shopping: '#D4537E',
  Health: '#8df873',
  Entertainment: '#E24B4A',
  Education: '#5DCAA5',
  Others: '#888780',
};

export const MONTHS_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export function fmt(amount) {
  return '₹' + Number(amount).toLocaleString('en-IN');
}

export function fmtK(amount) {
  if (amount >= 100000) return '₹' + (amount / 100000).toFixed(1) + 'L';
  if (amount >= 1000) return '₹' + (amount / 1000).toFixed(1) + 'k';
  return '₹' + amount;
}

//helper function to extport transactions to CSV
export function exportToCSV(transactions, filename = 'transactions.csv') {
  const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];

  const rows = transactions.map((t) => [
    t.date,
    `"${t.description.replace(/"/g, '""')}"`,
    t.category,
    t.type,
    t.amount,
  ]);

  const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
