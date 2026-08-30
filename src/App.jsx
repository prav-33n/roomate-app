import React, { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import ExpenseTracker from './components/ExpenseTracker';
import ChoreTracker from './components/ChoreTracker';

const INITIAL_CHORES = [
  { id: 1, taskName: 'Kitchen Countertops & Dishes', frequency: 'Daily rotation', currentIndex: 0, isCompleted: false },
  { id: 2, taskName: 'Living Room Vacuuming', frequency: 'Bi-weekly rotation', currentIndex: 1, isCompleted: false },
  { id: 3, taskName: 'Bathroom Scrubdown', frequency: 'Weekly rotation', currentIndex: 2, isCompleted: false },
  { id: 4, taskName: 'Trash Disposal & Recycling', frequency: 'Weekly rotation', currentIndex: 3, isCompleted: false },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('expenses');
  const [theme, setTheme] = useLocalStorage('theme', 'dark');
  const [expenses, setExpenses] = useLocalStorage('roomie-expenses', []);
  const [chores, setChores] = useLocalStorage('roomie-chores', INITIAL_CHORES);

  React.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-zinc-100 transition-colors duration-300">
      
      <header className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center border-b border-slate-200 dark:border-zinc-900">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <h1 className="text-xl font-black tracking-tighter uppercase">RoomieSync</h1>
        </div>
        
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="p-2 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-black rounded-xl text-sm transition-all hover:bg-slate-50 dark:hover:bg-zinc-900 font-bold"
        >
          {theme === 'light' ? '🌙 Dark Grid' : '☀️ Premium Emerald'}
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        
        <div className="flex space-x-2 border-b border-slate-200 dark:border-zinc-900 pb-px">
          <button
            onClick={() => setActiveTab('expenses')}
            className={`pb-3 text-sm font-black transition-all border-b-2 px-1 relative ${
              activeTab === 'expenses'
                ? 'border-emerald-500 text-emerald-500'
                : 'border-transparent text-slate-400 dark:text-zinc-500 hover:text-slate-600 dark:hover:text-zinc-300'
            }`}
          >
            Bill Ledger
          </button>
          <button
            onClick={() => setActiveTab('chores')}
            className={`pb-3 text-sm font-black transition-all border-b-2 px-1 relative ${
              activeTab === 'chores'
                ? 'border-emerald-500 text-emerald-500'
                : 'border-transparent text-slate-400 dark:text-zinc-500 hover:text-slate-600 dark:hover:text-zinc-300'
            }`}
          >
            Chore Matrix
          </button>
        </div>

        <div className="pt-2">
          {activeTab === 'expenses' ? (
            <ExpenseTracker expenses={expenses} setExpenses={setExpenses} />
          ) : (
            <ChoreTracker chores={chores} setChores={setChores} />
          )}
        </div>
      </main>

    </div>
  );
}
