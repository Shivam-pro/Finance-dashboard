import React, { useContext, useState } from "react";
import { Storecontext } from "../context/Storecontext";

function Transactions() {
  const { role, filteredTransactions, addTransaction, deleteTransaction, filter, setFilter, search, setSearch, showForm, setShowForm, editingTransaction, setEditingTransaction } = useContext(Storecontext);

  return (
    <div className="w-full dark:bg-(--primary) py-5 pr-4 lg:pr-0 lg:p-0 dark:text-(--text) h-full overflow-scroll">
      <h1 className="text-xl lg:text-2xl font-bold mb-6">Transactions</h1>
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="p-1 text-sm lg:text-lg lg:p-2 dark:bg-(--bg) border rounded" >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="p-1 lg:p-2 border dark:bg-(--bg) rounded w-full lg:w-fit" />
        {role === "admin" && (
          <button onClick={() => setShowForm(true)} className="bg-green-600 text-white px-2 lg:px-4 py-1 lg:py-2 rounded text-sm lg:text-lg" >
            + Add Transaction
          </button>
        )}
      </div>

      {/* Transactions Table */}
      <div className="dark:bg-(--bg) w-full dark:text-(--text) shadow-lg rounded-lg overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-200 dar:text-(--text-h)">
            <tr>
              <th className="p-1 text-sm lg:text-lg lg:p-3">Date</th>
              <th className="p-1 text-sm lg:text-lg lg:p-3">Description</th>
              <th className="p-1 text-sm lg:text-lg lg:p-3">Category</th>
              <th className="p-1 text-sm lg:text-lg lg:p-3">Amount</th>
              <th className="p-1 text-sm lg:text-lg lg:p-3">Type</th>
              {role === "admin" && <th className="p-1 text-sm lg:text-lg lg:p-3">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((t) => (
              <tr key={t.id} className="border-b">
                <td className="p-1 text-xs lg:text-lg lg:p-3">{t.date}</td>
                <td className="p-1 text-xs lg:text-lg lg:p-3">{t.description}</td>
                <td className="p-1 text-xs lg:text-lg lg:p-3">{t.category}</td>
                <td className={`p-1 text-xs lg:text-lg lg:p-3 ${t.type === "income" ? "text-green-600" : "text-red-600"}`}>
                  {t.amount > 0 ? `+₹${t.amount}` : `-₹${Math.abs(t.amount)}`}
                </td>
                <td className="p-1 text-xs lg:text-lg lg:p-3 capitalize">{t.type}</td>
                {role === "admin" && (
                  <td className="p-1 text-xs lg:text-lg lg:p-3">
                    <button className="text-blue-600 mr-2" onClick={() => { setShowForm(true); setEditingTransaction(t) }}>Edit</button>
                    <button className="text-red-600" onClick={() => { deleteTransaction(t) }}>Delete</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {filteredTransactions.length === 0 && (
        <p className="mt-4 text-gray-500">No transactions found.</p>
      )}
      {showForm && (
        <div className="fixed inset-0 p-6 lg:p-0 flex items-center justify-center bg-transparent bg-opacity-30 backdrop-blur-sm">
          <div className="bg-white dark:bg-(--bg) p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg lg:text-xl font-bold mb-4">
              {editingTransaction ? "Edit Transaction" : "Add Transaction"}
            </h2>
            <form
              onSubmit={addTransaction}
            >
              <input
                name="date"
                type="date"
                defaultValue={editingTransaction?.date || ""}
                className="w-full p-1 lg:p-2 border rounded mb-3"
                required
              />
              <input
                name="description"
                type="text"
                placeholder="Description"
                defaultValue={editingTransaction?.description || ""}
                className="w-full p-1 lg:p-2 border rounded mb-3"
                required
              />
              <input
                name="category"
                type="text"
                placeholder="Category"
                defaultValue={editingTransaction?.category || ""}
                className="w-full p-1 lg:p-2 border rounded mb-3"
                required
              />
              <input
                name="amount"
                type="number"
                step="0.01"
                placeholder="Amount"
                defaultValue={editingTransaction?.amount || ""}
                className="w-full p-1 lg:p-2 border rounded mb-3"
                required
              />
              <select
                name="type"
                defaultValue={editingTransaction?.type || "income"}
                className="w-full p-1 lg:p-2 border rounded mb-3"
                required
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingTransaction(null);
                  }}
                  className="px-4 py-1 lg:py-2 border rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-1 lg:py-2 rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Transactions;
