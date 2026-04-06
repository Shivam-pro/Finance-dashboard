import logo from '../assets/finance-logo.png';
import wallet from '../assets/wallet.png';
import growth from '../assets/growth-arrow.png';
import lose from '../assets/lose-arrow.png';
import goals_icon from '../assets/goals-icon.png';
import { nanoid } from 'nanoid';

export const assets = {
    logo,
    wallet,
    growth,
    lose,
    goals_icon,
}

// Mock data
export const initialTransactions  = {
  totalBalance : 1000000,
  transactions : [
  // April 2026
  { id: nanoid(), date: "2026-04-02", description: "Salary", category: "Income", amount: 75000, type: "income" },
  { id: nanoid(), date: "2026-04-05", description: "Groceries", category: "Food", amount: -3200, type: "expense" },
  { id: nanoid(), date: "2026-04-08", description: "Electricity Bill", category: "Bills", amount: -1800, type: "expense" },
  { id: nanoid(), date: "2026-04-12", description: "Movie Tickets", category: "Entertainment", amount: -600, type: "expense" },
  { id: nanoid(), date: "2026-04-15", description: "Freelance Project", category: "Income", amount: 12000, type: "income" },

  // May 2026
  { id: nanoid(), date: "2026-03-01", description: "Salary", category: "Income", amount: 75000, type: "income" },
  { id: nanoid(), date: "2026-03-04", description: "Groceries", category: "Food", amount: -3500, type: "expense" },
  { id: nanoid(), date: "2026-03-07", description: "Internet Bill", category: "Bills", amount: -1200, type: "expense" },
  { id: nanoid(), date: "2026-03-10", description: "Weekend Trip", category: "Travel", amount: -8500, type: "expense" },
  { id: nanoid(), date: "2026-03-18", description: "Stock Dividend", category: "Income", amount: 5000, type: "income" },

  // June 2026
  { id: nanoid(), date: "2026-02-01", description: "Salary", category: "Income", amount: 75000, type: "income" },
  { id: nanoid(), date: "2026-02-03", description: "Groceries", category: "Food", amount: -4000, type: "expense" },
  { id: nanoid(), date: "2026-02-06", description: "Flight Booking", category: "Travel", amount: -12000, type: "expense" },
  { id: nanoid(), date: "2026-02-09", description: "Dining Out", category: "Entertainment", amount: -2500, type: "expense" },
  { id: nanoid(), date: "2026-02-20", description: "Freelance Project", category: "Income", amount: 15000, type: "income" },
],
goals: [
  {
    id: nanoid(1),
    type: "savings",
    name: "Saving Goals",
    amount: 20000,
    date: "2026-04-05"
  },
  {
    id: nanoid(2),
    type: "expenses",
    name: "Expenses limit",
    amount: 20000,
    date: "2026-04-05"
  }
]
};
