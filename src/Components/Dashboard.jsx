import React, { useContext, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { assets, initialTransactions } from "../assets/assets";
import { Storecontext } from "../context/Storecontext";
const COLORS = ["#3b82f6", "#22c55e", "#facc15", "#ef4444"];

function Dashboard() {
    const { balanceTrend, spendingBreakdown, totalExpenses, totalIncome, currentMonth, currentYear, userGoals, savings } = useContext(Storecontext);
    const highestCategory = spendingBreakdown.reduce((max, curr) =>
        curr.amount > max.amount ? curr : max);
    return (
        <div className='dark:bg-(--primary) w-full h-full py-5 pr-4 lg:pr-0 lg:p-0 flex flex-col overflow-scroll'>
            {/* Summary Cards */}
            <div className="flex flex-wrap md:grid md:grid-cols-3 lg:grid lg:grid-cols-3 gap-6 mb-8">
                <div className="dark:bg-(--bg) dark:text-white shadow-lg rounded-lg p-3 lg:p-6 flex items-center gap-3">
                    <img src={assets.wallet} className="h-7 w-7 lg:h-10 lg:w-10" alt="" />
                    <div>
                        <h2 className="dark:text-(--text) text-xs lg:text-lg">Total Balance</h2>
                        <p className="text-sm md:text-xl lg:text-2xl font-bold dark:text-(--text-h)">₹{initialTransactions.totalBalance}</p>
                    </div>
                </div>
                <div className="dark:bg-(--bg) dark:text-white shadow-lg rounded-lg p-3 lg:p-6 flex items-center gap-3">
                    <img src={assets.growth} className="h-7 w-7 lg:h-10 lg:w-10" alt="" />
                    <div>
                        <h2 className="dark:text-(--text) text-xs lg:text-lg">Income</h2>
                        <p className="text-sm md:text-xl lg:text-2xl font-bold text-green-600">₹{totalIncome || 0}</p>
                    </div>
                </div>
                <div className=" h-fit dark:bg-(--bg) dark:text-white shadow-lg rounded-lg p-3 lg:p-6 flex items-center gap-3">
                    <img src={assets.lose} className="h-7 w-7 lg:h-10 lg:w-10" alt="" />
                    <div>
                        <h2 className="dark:text-(--text) text-xs lg:text-lg">Expenses</h2>
                        <p className="text-sm md:text-xl lg:text-2xl font-bold text-red-600">₹{totalExpenses || 0}</p>
                    </div>
                </div>
            </div>
            {/* Goals Section */}
            <div className="flex flex-wrap md:grid md:grid-cols-3 lg:grid lg:grid-cols-3 gap-4 w-full">
                {userGoals
                    .filter((t) => {
                        const date = new Date(t.date);
                        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
                    })
                    .map((goal) => {
                        const progressSaving = goal.amount / savings * 100;
                        const progressExpenses = totalExpenses / goal.amount * 100;
                        return goal.type === "savings" ?
                            (
                                <div key={goal.id} className="w-full dark:bg-(--bg) shadow-lg rounded-lg p-3 lg:p-6 mb-8 relative">
                                    <h2 className="dark:text-(--text) mb-2">{goal.name}</h2>
                                    <div className="lg:mb-6">
                                        <p className="dark:text-(--text) font-medium">{goal.type}</p>
                                        <div className="w-full bg-gray-200 rounded-full overflow-hidden h-3">
                                            <div
                                                className={`${progressSaving <= 40
                                                    ? "bg-green-500"
                                                    : progressSaving <= 80
                                                        ? "bg-yellow-500"
                                                        : "bg-red-500"
                                                    } h-3 rounded-full`}
                                                style={{ width: `${progressSaving}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-sm dark:text-(--text-h) mt-1">
                                            ₹{savings} / ₹ {goal.amount}
                                        </p>
                                    </div>
                                </div>
                            ) :
                            (
                                <div key={goal.id} className="w-full dark:bg-(--bg) shadow-lg rounded-lg p-3 lg:p-6 mb-8 relative">
                                    <h2 className="dark:text-(--text) mb-2">{goal.name}</h2>
                                    <div className="lg:mb-6">
                                        <p className="dark:text-(--text) font-medium">{goal.type}</p>
                                        <div className="w-full bg-gray-200 rounded-full overflow-hidden h-3">
                                            <div
                                                className={`${progressExpenses <= 40
                                                    ? "bg-green-500"
                                                    : progressExpenses <= 80
                                                        ? "bg-yellow-500"
                                                        : "bg-red-500"
                                                    } h-3 rounded-full`}
                                                style={{ width: `${progressExpenses}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-sm dark:text-(--text-h) mt-1">
                                            ₹{totalExpenses} / ₹{goal.amount}
                                        </p>
                                    </div>
                                </div>
                            )
                    })}
            </div>

            {/* Charts */}
            <div className="flex flex-wrap gap-8 mb-8">
                {/* Balance Trend */}
                <div className="dark:bg-(--bg) dark:text-white shadow-lg rounded-lg w-full h-70 lg:w-[48%] lg:h-100 p-3 lg:p-6">
                    <h2 className="dark:text-(--text) mb-4">Balance Trend</h2>
                    <ResponsiveContainer width="100%" height="90%">
                        <LineChart data={balanceTrend}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="balance"
                                stroke="#3b82f6"
                                strokeWidth={2}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Spending Breakdown */}
                <div className="dark:bg-(--bg) dark:text-white shadow-lg rounded-lg w-full h-90 lg:w-[48%] lg:h-100 p-3 lg:p-6">
                    <h2 className="dark:text-(--text) mb-4">Spending Breakdown</h2>
                    <ResponsiveContainer width="90%" height="80%">
                        <PieChart width={400} height={200}>
                            <Pie
                                data={spendingBreakdown}
                                dataKey="value"
                                nameKey="category"
                                cx="50%"
                                cy="50%"
                                outerRadius="80%"
                                label
                            >
                                {spendingBreakdown.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <div className="h-10"></div>
                            <Legend />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Insights */}
            <div className="dark:bg-(--bg) dark:text-(--text-h) shadow-lg rounded-lg p-6">
                <h2 className="dark:text-(--text) mb-4">Key Insights</h2>
                <ul className="space-y-2 text-xs lg:text-lg">
                    <li>✅ Your highest spending category this month is <strong>{highestCategory.category}     (₹{highestCategory.value})</strong>.</li>
                    <li>📊 Expenses in May (₹3800) are higher than April (₹2900).</li>
                    <li>⚖️ Your income this month is {Math.floor(totalIncome / totalExpenses)}× your expenses, which gives you room to allocate more toward long‑term goals</li>
                </ul>
            </div>
        </div>
    );
}

export default Dashboard;
