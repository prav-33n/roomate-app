import React, { useState } from 'react';

export default function AdminPanel({ roommates, setRoommates, expenses, chores }) {
  const [newName, setNewName] = useState('');
  const [error, setError] = useState('');

  const handleAddRoommate = (e) => {
    e.preventDefault();
    const cleanName = newName.trim();

    if (!cleanName) {
      setError('Name field cannot be empty.');
      return;
    }

    if (roommates.some(name => name.toLowerCase() === cleanName.toLowerCase())) {
      setError('This roommate already exists in the system.');
      return;
    }

    setError('');
    setRoommates([...roommates, cleanName]);
    setNewName('');
  };

  const handleDeleteRoommate = (nameToDelete) => {
    if (roommates.length <= 2) {
      setError('You must have at least 2 roommates to maintain accurate splits.');
      return;
    }

    const hasExpenses = expenses.some(exp => exp.paidBy === nameToDelete);
    if (hasExpenses) {
      setError(`Cannot remove ${nameToDelete} while they have active items in the bill ledger.`);
      return;
    }

    setError('');
    setRoommates(roommates.filter(name => name !== nameToDelete));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Control Configuration panel */}
      <div className="bg-white dark:bg-black p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 h-fit">
        <h2 className="text-lg font-black tracking-tight mb-2 text-black dark:text-white">Roster Controls</h2>
        <p className="text-xs text-slate-400 dark:text-zinc-500 mb-4">Incorporate or offload members from the household matrix.</p>
        
        <form onSubmit={handleAddRoommate} className="space-y-4">
          {error && (
            <div className="p-3 text-xs bg-rose-50 dark:bg-rose-950/20 text-rose-500 border border-rose-100 dark:border-rose-900/50 rounded-xl font-bold">
              ⚠️ {error}
            </div>
          )}

          <div>
            <label className="block text-[11px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-zinc-500 mb-1">
              Roommate Legal Name
            </label>
            <input
              type="text"
              placeholder="e.g., Monica, Chloe"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-black dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/10 text-sm"
          >
            + Register New Roommate
          </button>
        </form>
      </div>

      <div className="lg:col-span-2 bg-white dark:bg-black p-6 rounded-2xl border border-slate-200 dark:border-zinc-800">
        <h2 className="text-lg font-black tracking-tight text-black dark:text-white mb-1">Active Core Registry</h2>
        <p className="text-xs text-slate-400 dark:text-zinc-500 mb-6">Current active members receiving calculations.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {roommates.map((name) => {
            const billCount = expenses.filter(exp => exp.paidBy === name).length;

            return (
              <div 
                key={name} 
                className="p-4 border border-slate-200 dark:border-zinc-800 rounded-xl flex items-center justify-between bg-slate-50/50 dark:bg-zinc-950/20 group"
              >
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-zinc-100">{name}</h4>
                  <p className="text-xs text-slate-400 dark:text-zinc-500 mt-0.5">{billCount} bills uploaded</p>
                </div>
                
                <button
                  onClick={() => handleDeleteRoommate(name)}
                  className="text-xs font-bold text-zinc-400 hover:text-rose-500 p-2 border border-slate-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-black transition-colors"
                  title={`Expel ${name}`}
                >
                  Remove ✕
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
