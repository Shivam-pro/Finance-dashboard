import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  ResponsiveContainer
} from "recharts";

// Mock data
const cashFlowTrend = [
  { month: "Jan", income: 4000, expenses: 2500 },
  { month: "Feb", income: 4200, expenses: 2800 },
  { month: "Mar", income: 4500, expenses: 3000 },
  { month: "Apr", income: 4800, expenses: 2900 },
  { month: "May", income: 5200, expenses: 3800 },
];

const savingsRate = [
  { month: "Jan", rate: 35 },
  { month: "Feb", rate: 33 },
  { month: "Mar", rate: 40 },
  { month: "Apr", rate: 38 },
  { month: "May", rate: 27 },
];

function Analytics() {
  return (
    <div className="dark:bg-(--primary) dark:text-(--text) h-full overflow-scroll w-full py-5 pr-4 lg:pr-0 lg:p-0">
      <h1 className="text-xl lg:text-2xl font-bold mb-6">Analytics</h1>
      <div className="flex flex-wrap justify-between">
        {/* Cash Flow Trend */}
        <div className="dark:bg-(--bg) shadow-lg rounded-lg mb-8 w-full h-70 lg:w-[48%] lg:h-100 p-3 lg:p-6">
          <h2 className="dark:text-(--text) mb-4">Cash Flow Trend</h2>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart width={500} height={300} data={cashFlowTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={2} />
              <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Savings Rate */}
        <div className="dark:bg-(--bg) shadow-lg rounded-lg w-full h-70 lg:w-[48%] lg:h-100 p-3 lg:p-6">
          <h2 className="dark:text-(--text) mb-4">Savings Rate (%)</h2>
          <ResponsiveContainer width="90%" height="90%">
            <BarChart width={500} height={300} data={savingsRate}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="rate" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
