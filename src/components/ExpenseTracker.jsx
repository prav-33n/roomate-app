import React, { useState } from 'react';
  
export default function ExpenseTracker({ expenses, setExpenses, roommates }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState(roommates[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount || parseFloat(amount) <= 0) return;

    const newExpense = {
      id: crypto.randomUUID(),
      description,
      amount: parseFloat(amount),
      paidBy,
      date: new Date().toLocaleDateString(),
    };

    setExpenses([newExpense, ...expenses]);
    setDescription('');
    setAmount('');
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const sharePerPerson = totalExpenses / roommates.length;

  const balances = roommmates.reduce((acc, name) => {
    const totalPaidByPerson = expenses
      .filter((exp) => exp.paidBy === name)
      .reduce((sum, exp) => sum + exp.amount, 0);
    
    acc[name] = totalPaidByPerson - sharePerPerson;
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {roommates.map((name) => {
          const bal = balances[name] || 0;
          const isOwed = bal >= 0;
          return (
            <div 
              key={name} 
              className="p-5 rounded-2xl bg-white dark:bg-black border border-slate-200 dark:border-zinc-800 shadow-sm"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">{name}</p>
              <p className={`text-2xl font-black mt-2 ${isOwed ? 'text-emerald-500' : 'text-rose-500'}`}>
                {isOwed ? `+ $${bal.toFixed(2)}` : `- $${Math.abs(bal).toFixed(2)}`}
              </p>
              <p className="text-xs text-slate-400 dark:text-zinc-500 mt-1">
                {isOwed ? 'Gets back from group' : 'Owes collective pool'}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="bg-white dark:bg-black p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 h-fit">
          <h2 className="text-lg font-black tracking-tight mb-4 text-black dark:text-white">Log Shared Bill</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-zinc-500 mb-1">
                Bill Description
              </label>
              <input
                type="text"
                placeholder="e.g., Gas bill, House cleaning"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-500 text-black dark:text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-zinc-500 mb-1">
                Total Amount ($)
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-500 text-black dark:text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-zinc-500 mb-1">
                Who Paid Initial Cost?
              </label>
              <select
                value={paidBy}
                onChange={(e) => setPaidBy(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-black text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-500 text-black dark:text-white"
              >
                {roommates.map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/10 active:scale-[0.99] text-sm mt-2"
            >
              Post & Split Cost
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-black p-6 rounded-2xl border border-slate-200 dark:border-zinc-800">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-black tracking-tight text-black dark:text-white">Active Ledger</h2>
            <div className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-full">
              Running Total: ${totalExpenses.toFixed(2)}
            </div>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-zinc-900 max-h-[360px] overflow-y-auto pr-2 custom-scrollbar">
            {expenses.length === 0 ? (
              <p className="text-center py-16 text-slate-400 dark:text-zinc-600 text-sm font-medium">No recorded transactions for this month.</p>
            ) : (
              expenses.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-4 first:pt-0 last:pb-0 group">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-zinc-100 text-sm">{item.description}</h4>
                    <p className="text-xs text-slate-400 dark:text-zinc-500 mt-1">
                      Cleared by <span className="font-semibold text-slate-600 dark:text-zinc-400">{item.paidBy}</span> on {item.date}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-extrabold text-slate-900 dark:text-zinc-100 text-sm">
                      ${item.amount.toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-slate-300 dark:text-zinc-700 hover:text-rose-500 dark:hover:text-rose-400 p-1.5 rounded-lg transition-colors md:opacity-0 group-hover:opacity-100 text-xs"
                      title="Remove transaction"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
