import React, { useState } from 'react';

export default function AuthScreen({ onLogin, roomates}) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [selectedUser, setSelectedUser] = useState(roomates[0]);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password) {
      setError('Password field cannot be blank.');
      return;
    }
    
    if (password.length < 4) {
      setError('Password must contain at least 4 characters.');
      return;
    }

    setError('');
    onLogin(selectedUser);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-black p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-2xl relative overflow-hidden">
        
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 text-xl font-black mb-4">
            🔒
          </div>
          <h2 className="text-2xl font-black tracking-tight text-black dark:text-white">
            {isSignUp ? 'Create Roomie Profile' : 'Access RoomieSync'}
          </h2>
          <p className="text-xs text-slate-400 dark:text-zinc-500 mt-2">
            {isSignUp ? 'Register your account onto the collective mesh.' : 'Select your profile identity to enter the ledger.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 text-xs bg-rose-50 dark:bg-rose-950/20 text-rose-500 border border-rose-100 dark:border-rose-900/50 rounded-xl font-bold">
              ⚠️ {error}
            </div>
          )}

          <div>
            <label className="block text-[11px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-zinc-500 mb-2">
              Select Your Identity
            </label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-black text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 text-black dark:text-white transition-all"
            >
              {roomates.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-zinc-500 mb-2">
              Secure Key Token (Password)
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-black dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-bold rounded-xl transition-all text-sm shadow-lg shadow-emerald-500/10 active:scale-[0.99] mt-2"
          >
            {isSignUp ? 'Initialize Profile' : 'Authenticate Session'}
          </button>
        </form>

        <div className="mt-6 text-center border-t border-slate-100 dark:border-zinc-900 pt-5">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
            }}
            className="text-xs font-bold text-slate-400 dark:text-zinc-500 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
          >
            {isSignUp ? 'Already registered? Log in here' : 'Need a new key? Set up account profile'}
          </button>
        </div>
      </div>
    </div>
  );
}
