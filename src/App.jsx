import React, { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import ExpenseTracker from './components/ExpenseTracker';
import ChoreTracker from './components/ChoreTracker';
import AuthScreen from './components/AuthScreen';
import AdminPanel from './components/AdminPanel'; 

const INITIAL_CHORES = [
  { id: 1, taskName: 'Kitchen Countertops & Dishes', frequency: 'Daily rotation', currentIndex: 0, isCompleted: false },
  { id: 2, taskName: 'Living Room Vacuuming', frequency: 'Bi-weekly rotation', currentIndex: 1, isCompleted: false },
  { id: 3, taskName: 'Bathroom Scrubdown', frequency: 'Weekly rotation', currentIndex: 2, isCompleted: false },
  { id: 4, taskName: 'Trash Disposal & Recycling', frequency: 'Weekly rotation', currentIndex: 3, isCompleted: false },
];

const DEFAULT_ROOMMATES = ['Tasha', 'Rihana', 'Lisa', 'Trinity'];

export default function App() {
  const [activeTab, setActiveTab] = useState('expenses');
  const [theme, setTheme] = useLocalStorage('theme', 'dark');
  const [expenses, setExpenses] = useLocalStorage('roomie-expenses', []);
  const [chores, setChores] = useLocalStorage('roomie-chores', INITIAL_CHORES);
  const [currentUser, setCurrentUser] = useLocalStorage('roomie-session-user', null);

  const [roommates, setRoommates] = useLocalStorage('roomie-roster', DEFAULT_ROOMMATES);

  React.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-black flex flex-col justify-between">
        <header className="max-w-6xl mx-auto w-full px-4 py-6 flex justify-between items-center">
          <h1 className="text-xl font-black tracking-tighter uppercase text-black dark:text-white">RoomieSync</h1>
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-2 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-black rounded-xl text-sm font-bold text-black dark:text-white"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </header>
        <AuthScreen onLogin={(name) => setCurrentUser(name)} roommates={roommates} />
        <footer className="py-6 text-center text-xs text-slate-400 dark:text-zinc-600">
          RoomieSync Portfolio Production Matrix © 2026
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-zinc-100 transition-colors duration-300">
      
      <header className="bg-white dark:bg-black border-b border-slate-200 dark:border-zinc-900 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex justify-between items-center">
          
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-lg font-black tracking-tighter uppercase">RoomieSync</h1>
          </div>

          <nav className="flex space-x-1 h-full items-center">
            <button
              onClick={() => setActiveTab('expenses')}
              className={`px-3 py-2 text-xs font-black rounded-xl transition-all ${
                activeTab === 'expenses' ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 border border-emerald-100 dark:border-emerald-900/50' : 'text-slate-400 dark:text-zinc-500'
              }`}
            >
              📊 Bills
            </button>
            <button
              onClick={() => setActiveTab('chores')}
              className={`px-3 py-2 text-xs font-black rounded-xl transition-all ${
                activeTab === 'chores' ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 border border-emerald-100 dark:border-emerald-900/50' : 'text-slate-400 dark:text-zinc-500'
              }`}
            >
              🧹 Chores
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-3 py-2 text-xs font-black rounded-xl transition-all ${
                activeTab === 'admin' ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 border border-emerald-100 dark:border-emerald-900/50' : 'text-slate-400 dark:text-zinc-500'
              }`}
            >
              ⚙️ Admin
            </button>
          </nav>

          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs font-bold text-slate-400 dark:text-zinc-500">Active Profile</span>
              <span className="text-xs font-black text-emerald-500">{currentUser}</span>
            </div>
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="p-2 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-black rounded-xl text-xs font-bold">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button onClick={() => setCurrentUser(null)} className="px-3 py-2 text-xs font-bold border border-rose-200 dark:border-rose-950/50 bg-rose-50/50 dark:bg-rose-950/10 text-rose-500 rounded-xl">
              Exit ✕
            </button>
          </div>

        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="transition-all duration-200">
          {activeTab === 'expenses' && (
            <ExpenseTracker expenses={expenses} setExpenses={setExpenses} roommates={roommates} />
          )}
          {activeTab === 'chores' && (
            <ChoreTracker chores={chores} setChores={setChores} roommates={roommates} />
          )}
          {activeTab === 'admin' && (
            <AdminPanel roommates={roommates} setRoommates={setRoommates} expenses={expenses} chores={chores} />
          )}
        </div>
      </main>

    </div>
  );
}
