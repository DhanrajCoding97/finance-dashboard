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
      balance: income - expenses, // ← derived here
    }));
};
