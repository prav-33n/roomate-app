import React from 'react';

const ROOMMATES = ['Tasha', 'Rihana', 'Lisa', 'Trinity'];

export default function ChoreTracker({ chores, setChores }) {
  
  const handleRotate = (choreId) => {
    setChores(
      chores.map((chore) => {
        if (chore.id !== choreId) return chore;
        const nextIndex = (chore.currentIndex + 1) % ROOMMATES.length;
        return {
          ...chore,
          currentIndex: nextIndex,
          isCompleted: false, 
        };
      })
    );
  };

  const handleToggleComplete = (choreId) => {
    setChores(
      chores.map((chore) => 
        chore.id === choreId ? { ...chore, isCompleted: !chore.isCompleted } : chore
      )
    );
  };

  return (
    <div className="bg-white dark:bg-black rounded-2xl border border-slate-200 dark:border-zinc-800 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-black tracking-tight text-black dark:text-white">Chore Rotations</h2>
          <p className="text-xs text-slate-400 dark:text-zinc-500 mt-1">Rotate duties down the schedule upon completion.</p>
        </div>
        <div className="text-xs font-mono px-2 py-1 border border-slate-200 dark:border-zinc-800 rounded bg-slate-50 dark:bg-zinc-900 text-slate-500 dark:text-zinc-400">
          Rotation Order: Tasha → Rihana → Lisa → Trinity
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 dark:border-zinc-900">
              <th className="pb-3 text-[11px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-zinc-500 w-12 text-center">Status</th>
              <th className="pb-3 text-[11px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-zinc-500 pl-4">Chore Task</th>
              <th className="pb-3 text-[11px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-zinc-500">Assigned To</th>
              <th className="pb-3 text-[11px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-zinc-500 text-right pr-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-zinc-900">
            {chores.map((chore) => {
              const currentAssignee = ROOMMATES[chore.currentIndex];
              
              return (
                <tr key={chore.id} className="group hover:bg-slate-50/50 dark:hover:bg-zinc-950/40 transition-colors">
                  <td className="py-4 text-center">
                    <input
                      type="checkbox"
                      checked={chore.isCompleted}
                      onChange={() => handleToggleComplete(chore.id)}
                      className="w-4 h-4 rounded border-slate-300 dark:border-zinc-700 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0 bg-transparent cursor-pointer accent-emerald-500"
                    />
                  </td>

                  <td className="py-4 pl-4">
                    <div className="font-bold text-sm text-slate-900 dark:text-zinc-100">
                      {chore.taskName}
                    </div>
                    <div className="text-xs text-slate-400 dark:text-zinc-500 mt-0.5">
                      {chore.frequency}
                    </div>
                  </td>

                  <td className="py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border transition-colors ${
                      chore.isCompleted 
                        ? 'bg-slate-100 border-slate-200 text-slate-400 dark:bg-zinc-900 dark:border-zinc-800 line-through' 
                        : 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50 text-emerald-600 dark:text-emerald-400'
                    }`}>
                      👤 {currentAssignee}
                    </span>
                  </td>

                  <td className="py-4 text-right pr-4">
                    <button
                      onClick={() => handleRotate(chore.id)}
                      className="text-xs font-bold text-slate-500 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 px-3 py-1.5 border border-slate-200 dark:border-zinc-800 rounded-xl hover:border-emerald-200 dark:hover:border-emerald-900 bg-white dark:bg-black transition-all"
                    >
                      🔄 Next Turn
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
