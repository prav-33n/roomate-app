import { useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      
      <nav className="bg-zinc-900 text-zinc-100 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold tracking-wider text-emerald-400">MyRoomie</span>
            </div>
            <div className="hidden md:flex space-x-8 font-medium">
              <a href="#" className="text-emerald-400 hover:text-white transition duration-200">Home</a>
              <a href="#" className="text-zinc-300 hover:text-white transition duration-200">About</a>
              <a href="#" className="text-zinc-300 hover:text-white transition duration-200">Services</a>
              <a href="#" className="text-zinc-300 hover:text-white transition duration-200">Contact</a>
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-zinc-400 hover:text-white focus:outline-none"
                aria-label="Toggle menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden bg-zinc-800 px-2 pt-2 pb-4 space-y-1 sm:px-3 border-t border-zinc-700">
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-emerald-400 bg-zinc-900">Home</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-zinc-300 hover:text-white hover:bg-zinc-700">About</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-zinc-300 hover:text-white hover:bg-zinc-700">Services</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-zinc-300 hover:text-white hover:bg-zinc-700">Contact</a>
          </div>
        )}
      </nav>

      <header className="flex-grow flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6 max-w-xl">
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-emerald-400 bg-emerald-950/50 border border-emerald-800/50 rounded-full">
                Introducing Version 4.0
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Build something <span className="text-emerald-400">extraordinary</span> with speed.
              </h1>
              <p className="text-lg text-zinc-400">
                A premium, lightning-fast foundation designed to bypass the noise and give you a sleek, highly customizable digital canvas.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button className="px-6 py-3 font-semibold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 transition duration-200 rounded-lg shadow-lg shadow-emerald-500/10">
                  Get Started Free
                </button>
                <button className="px-6 py-3 font-semibold text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition duration-200 rounded-lg">
                  Documentation
                </button>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur-xl opacity-25 group-hover:opacity-40 transition duration-500"></div>
              
              <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl space-y-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/70"></div>
                </div>
                <div className="h-40 sm:h-48 bg-zinc-950 rounded-lg border border-zinc-800/80 flex items-center justify-center">
                  <code className="text-sm text-emerald-400 font-mono">npm run dev</code>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
                  <div className="h-4 bg-zinc-800 rounded w-1/2"></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>

    </div>
  );
}

export default App;
