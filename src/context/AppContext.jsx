import { createContext, useContext, useReducer, useEffect } from 'react';
import { mockTransactions } from '@/data/mockData';

const AppContext = createContext();

const initialState = {
  transactions: [],
  role: 'viewer', // viewer or admin
  theme: 'system', // light, dark, system
  filters: {
    search: '',
    type: 'all', // all, income, expense
    category: 'all', // all, Food & Dining, Transport, etc.
    sortBy: 'date-desc', // date-desc, date-asc, amount-desc, amount-asc
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload };

    case 'ADD_TRANSACTION': {
      const updated = [action.payload, ...state.transactions];
      localStorage.setItem('transactions', JSON.stringify(updated));
      return { ...state, transactions: updated };
    }

    case 'DELETE_TRANSACTION': {
      const updated = state.transactions.filter((t) => t.id !== action.payload);
      localStorage.setItem('transactions', JSON.stringify(updated));
      return { ...state, transactions: updated };
    }

    case 'SET_ROLE': {
      localStorage.setItem('role', action.payload);
      return { ...state, role: action.payload };
    }

    case 'SET_THEME': {
      localStorage.setItem('theme', action.payload);
      return { ...state, theme: action.payload };
    }

    case 'SET_FILTER': {
      return { ...state, filters: { ...state.filters, ...action.payload } };
    }

    case 'RESET_FILTER': {
      return { ...state, filters: initialState.filters };
    }

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load initial data from localStorage or mock data
  useEffect(() => {
    const savedTransactions = localStorage.getItem('transactions');
    const savedRole = localStorage.getItem('role');
    const savedTheme = localStorage.getItem('theme');

    dispatch({
      type: 'SET_TRANSACTIONS',
      payload: savedTransactions
        ? JSON.parse(savedTransactions)
        : mockTransactions,
    });

    if (savedRole) dispatch({ type: 'SET_ROLE', payload: savedRole });
    if (savedTheme) dispatch({ type: 'SET_THEME', payload: savedTheme });
  }, []);

  // Apply dark / light theme
  useEffect(() => {
    const root = window.document.documentElement;

    if (state.theme === 'dark') {
      root.classList.add('dark');
    } else if (state.theme === 'light') {
      root.classList.remove('dark');
    } else {
      // system
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      root.classList.toggle('dark', prefersDark);
    }
  }, [state.theme]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

//custom hook for using context
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be within AppProvider');
  return context;
}
