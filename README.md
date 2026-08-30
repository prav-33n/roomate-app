# RoomieSync — Premium Shared Expense & Chore Matrix

RoomieSync is a high-performance, client-side web application designed to eliminate household friction by automating financial bill splitting and tracking domestic chore schedules. Built entirely in React and styled with a custom high-contrast emerald-on-black theme, it showcases advanced frontend architectural concepts without requiring a backend database.

## 🚀 Live Demo & Presentation Quick-Start
* **Default Roster:** Tasha, Rihana, Lisa, Trinity
* **Simulated Passwords:** Any token string (≥ 4 characters) can be used to initialize or access a session.

---

## 🛠️ Tech Stack & Architecture Highlights

* **Core Framework:** React 18+ (Functional Components & Hooks)
* **Styling Engine:** Tailwind CSS (Native dark/light class prefix layers)
* **State Persistence:** Reactive HTML5 Web Storage (`localStorage` syncing)
* **Design Philosophy:** Minimalist monochrome baseline punctuated by neon emerald micro-interactions.

### File Tree Layout
```text
src/
├── components/
│   ├── AdminPanel.jsx     # Roster mutation engine & safety validation constraints
│   ├── AuthScreen.jsx     # Client-side session simulator & routing guards
│   ├── ChoreTracker.jsx   # Grid-based automated cyclic queue task matrix
│   └── ExpenseTracker.jsx # Floating-point relational ledger math calculator
├── hooks/
│   └── useLocalStorage.js # Optimized isomorphic global state persistence engine
├── App.jsx               # Universal application command deck & state distributor
└── index.css             # Tailwind baseline injection layer
```

---

## 💡 Key Problem-Solving Features (Capstone Criteria)

### 1. Dynamic Expense Splitting Engine
* **The Problem:** Manual split sheets result in calculation friction and human error.
* **The Solution:** Computes net balances on the fly using runtime aggregate matrices. The application divides total ledger sheets by the dynamic roommate count, calculates individual out-of-pocket investments, and sets high-visibility debt/credit labels (`+ Gets back` / `- Owes pool`).

### 2. Zero-Loss Cyclic Chore Matrix
* **The Problem:** Hardcoded task checklists fail to adapt when household size shifts.
* **The Solution:** Uses a custom cyclic index shifter powered by the JavaScript modulo operator (`(index + 1) % roommates.length`). When a user pushes a chore forward, it wraps around the dynamically updated household roster, resetting the status checkboxes automatically for the new turn.

### 3. Account Identity Guard & Admin Deck
* **The Problem:** Basic applications throw errors when data structures are altered or missing.
* **The Solution:** Incorporates a client-side session checker that blocks unauthorized view access. The Admin Deck gives creators power to add or expel members on the fly, backed by **Referential Integrity Constraints** that stop a user from being deleted if their profile is currently linked to active items in the financial ledger.

---

## 🏎️ Engineering & Performance Optimization Matrix

* **State Hoisting Design:** State values are elevated to `App.jsx` to prevent data silos. This ensures updates to the roster instantly ripple through the Auth dropdown, the Expense formulas, and the Chore tracking arrays simultaneously without delay.
* **Custom Memoized Storage Hooks:** Replaces repetitive, costly `localStorage` reads with a single custom synchronization hook (`useLocalStorage`). Initial reads execute on the first render layout setup via lazy functional state injection to avoid runtime lag.
* **Fluid Layout Transitions:** Uses Tailwind's responsive grid system and uniform dark mode selectors (`bg-neutral-50 dark:bg-black`). Cards fade smoothly over a 300ms duration curve, creating an elite visual flow during theme switching.

---

## 📦 Local Installation Guide

Follow these simple setup steps to run the application locally on your machine:

1. Clone the repository to your desktop machine:
   ```bash
   git clone https://github.com
   cd roomiesync
   ```

2. Install the necessary development dependencies:
   ```bash
   npm install
   ```

3. Initialize the development server loop:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the address displayed in your terminal (typically `http://localhost:5173`).
