import {
  CheckSquare,
  Moon,
  Sun,
  Sparkles,
} from "lucide-react";

export default function Header({
  darkMode,
  setDarkMode,
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/85">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex min-w-0 items-center gap-3.5">
          {/* Logo */}
          <div className="group relative shrink-0">
            <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 opacity-20 blur-lg transition duration-300 group-hover:opacity-40" />

            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-blue-600 to-violet-600 text-white shadow-lg shadow-blue-500/20 ring-1 ring-white/20">
              <CheckSquare
                size={22}
                strokeWidth={2.4}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          </div>

          {/* Brand content */}
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-[17px] font-bold tracking-tight text-slate-900 dark:text-white sm:text-lg">
                TaskFlow
              </h1>

              <span className="hidden items-center gap-1 rounded-full border border-blue-200/80 bg-blue-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-blue-600 sm:inline-flex dark:border-blue-900/60 dark:bg-blue-950/50 dark:text-blue-400">
                <Sparkles size={9} />
                Pro
              </span>
            </div>

            <p className="mt-0.5 hidden text-[11px] font-medium text-slate-500 dark:text-slate-400 sm:block">
              Organize. Focus. Get things done.
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* System status */}
          <div className="hidden items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50/80 px-3 py-1.5 text-[11px] font-semibold text-slate-500 shadow-sm md:flex dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
            </span>

            All systems ready
          </div>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={() =>
              setDarkMode((value) => !value)
            }
            className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-slate-200/80 bg-white text-slate-600 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700/80 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800 dark:dark:text-white"
            aria-label={
              darkMode
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            title={
              darkMode
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
          >
            <span className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-violet-500/10 opacity-0 transition-opacity group-hover:opacity-100" />

            <span className="relative transition-transform duration-300 group-hover:rotate-12">
              {darkMode ? (
                <Sun
                  size={18}
                  strokeWidth={2.2}
                />
              ) : (
                <Moon
                  size={18}
                  strokeWidth={2.2}
                />
              )}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
