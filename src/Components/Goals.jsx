import { useContext, useState } from "react";
import { Storecontext } from "../context/Storecontext.jsx";

function Goals() {
  const { totalExpenses, totalIncome, userGoals, savings, goalType, setGoalType, setGoalAmount, goalAmount, addGoal } = useContext(Storecontext);

  // Generate alerts based on goals
  const alerts = userGoals.map((goal, index) => {
    if (goal.type === "savings") {
      if (savings < goal.amount) {
        return `⚠️ Alert: Your savings (₹${savings}) are below your goal of ₹${goal.amount}.`;
      } else {
        return `✅ Good job! Your savings (₹${savings}) meet your goal of ₹${goal.amount}.`;
      }
    }
    if (goal.type === "expenses") {
      if (totalExpenses > goal.amount) {
        return `⚠️ Alert: Your expenses (₹${totalExpenses}) exceeded your limit of ₹${goal.amount}.`;
      } else {
        return `✅ Great! Your expenses (₹${totalExpenses}) are within your limit of ₹${goal.amount}.`;
      }
    }
    return null;
  });

  return (
    <div className="dark:bg-(--primary) dark:text-(--text) h-full w-full overflow-scroll py-5 pr-4 lg:pr-0 lg:p-0">
      <h1 className="text-xl lg:text-2xl font-bold mb-6">Goals & Alerts</h1>
      {/* Goal Form */}
      <div className="dark:bg-(--bg) shadow-lg rounded-lg p-3 lg:p-6 mb-8 w-full lg:w-fit">
        <h2 className="dark:text-(--text) mb-4">Set a Goal</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <select
            value={goalType}
            onChange={(e) => setGoalType(e.target.value)}
            className="h-fit text-sm lg:text-lg p-1 lg:p-2 border rounded dark:bg-(--bg)"
          >
            <option value="savings">Savings Goal</option>
            <option value="expenses">Expense Limit</option>
          </select>
          <input
            type="number"
            placeholder="Enter amount"
            value={goalAmount}
            onChange={(e) => setGoalAmount(e.target.value)}
            className="lg:p-2 p-1 h-fit w-fit border rounded flex-1"
          />
          <button
            onClick={addGoal}
            className="bg-green-600 text-white px-2 lg:px-4 py-1 lg:py-2 rounded text-sm lg:text-lg"
          >
            Add Goal
          </button>
        </div>
        {/* Current Totals */}
        <p className="text-xs lg:text-sm dark:text-(--text)">
          Current Income: ₹{totalIncome} | Expenses: ₹{totalExpenses} | Savings: ₹{savings}
        </p>
      </div>
      {/* Alerts Section */}
      <div className="dark:bg-(--bg) shadow-lg rounded-lg p-6 w-fit">
        <h2 className="dark:text-(--text) mb-4">Alerts</h2>
        {alerts.length === 0 ? (
          <p className="dark:text-(--text)">No goals set yet.</p>
        ) : (
          <ul className="space-y-2">
            {alerts.map((alert, i) => (
              <li key={i} className="text-xs lg:text-sm">{alert}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Goals;

