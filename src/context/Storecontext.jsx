import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { initialTransactions } from "../assets/assets.js";
import { nanoid } from "nanoid";

export const Storecontext = createContext(null);

const StoreContextProvider = ({ children }) => {
    const loadFromStorage = (key, fallback) => {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : fallback;
    };
    const [transactions, setTransactions] = useState(
        loadFromStorage("transactions", initialTransactions.transactions)
    );
    const [userGoals, setUserGoals] = useState(
        loadFromStorage("userGoals", initialTransactions.goals)
    );
    const [role, setRole] = useState("view");
    const [focus, setFocus] = useState("dashboard");
    const navigate = useNavigate();
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [goalType, setGoalType] = useState("savings");
    const [goalAmount, setGoalAmount] = useState("");

    useEffect(() => {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions]);

    useEffect(() => {
        localStorage.setItem("userGoals", JSON.stringify(userGoals));
    }, [userGoals]);


    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const currentMonthTransactions = transactions.filter((t) => {
        const date = new Date(t.date);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });


    const balanceTrend = transactions.reduce((acc, t) => {
        const month = new Date(t.date).toLocaleString("default", { month: "short" });
        const existing = acc.find(item => item.month === month);
        const amount = t.type === "income" ? t.amount : -Math.abs(t.amount);

        if (existing) {
            existing.balance += amount;
        } else {
            acc.push({ month, balance: amount });
        }
        return acc;
    }, []);

    const spendingBreakdown = currentMonthTransactions
        .filter(t => t.type === "expense")
        .reduce((acc, t) => {
            const existing = acc.find(item => item.category === t.category);
            if (existing) {
                existing.value += Math.abs(t.amount);
            } else {
                acc.push({ category: t.category, value: Math.abs(t.amount) });
            }
            return acc;
        }, []);

    const totalIncome = currentMonthTransactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = currentMonthTransactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    // Filter + search logic
    const filteredTransactions = transactions.filter((t) => {
        const matchesFilter = filter === "all" || t.type === filter;
        const matchesSearch = t.description.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    }).sort((a, b) => new Date(b.date) - new Date(a.date));

    // Add transaction
    const addTransaction = (e) => {
        e.preventDefault();
        const updatedTransaction = {
            id: editingTransaction ? editingTransaction.id : transactions.length + 1,
            date: e.target.date.value,
            description: e.target.description.value,
            category: e.target.category.value,
            amount: parseFloat(e.target.amount.value),
            type: e.target.type.value,
        };
        if (editingTransaction) {
            // replace the old transaction
            const newTransactions = transactions.map((t) =>
                t.id === editingTransaction.id ? updatedTransaction : t
            );
            setTransactions(newTransactions);
        } else {
            // add new transaction
            setTransactions([...transactions, updatedTransaction]);
        }
        setShowForm(false);
        setEditingTransaction(null);
    };
    // Delete Transaction
    const deleteTransaction = (t) => {
        const newTransaction = transactions.filter((transaction) => {
            return t !== transaction;
        })
        setTransactions(newTransaction);
    }

    const savings = totalIncome - totalExpenses;
    // Add new goal
    const addGoal = () => {
        if (!goalAmount) return;
        const amount = parseFloat(goalAmount);
        if (goalType === "savings") {
            if (savings < amount) {
                return;
            }
        }
        if (goalType === "expenses") {
            if (totalExpenses > amount) {
                return;
            }
        }
        const newGoal = {
            id: nanoid(),
            type: goalType,
            amount,
            date: new Date()
        };

        setUserGoals([...userGoals, newGoal]);
        setGoalAmount("");
    };

    const contextValue = {
        role,
        setRole,
        focus,
        setFocus,
        navigate,
        transactions,
        setTransactions,
        balanceTrend,
        spendingBreakdown,
        totalExpenses,
        totalIncome,
        currentMonthTransactions,
        currentYear,
        currentMonth,
        userGoals,
        setUserGoals,
        filter,
        setFilter,
        search,
        setSearch,
        showForm,
        setShowForm,
        filteredTransactions,
        addTransaction,
        deleteTransaction,
        editingTransaction,
        setEditingTransaction,
        addGoal,
        savings,
        setGoalAmount,
        goalAmount,
        setGoalType,
        goalType
    }
    return (
        <Storecontext.Provider value={contextValue}>
            {children}
        </Storecontext.Provider>
    )
}

export default StoreContextProvider;