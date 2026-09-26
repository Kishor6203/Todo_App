import {
  CheckCircle2,
  Sparkles,
  ArrowDown,
} from "lucide-react";

export default function EmptyState() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white px-6 py-14 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:px-10">
      {/* Ambient background */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-md flex-col items-center">
        {/* Icon */}
        <div className="relative mb-6">
          <div className="absolute -inset-4 rounded-full bg-emerald-500/10 blur-xl" />

          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 text-emerald-500 shadow-lg shadow-emerald-500/10 dark:border-emerald-900/60 dark:from-emerald-950/60 dark:to-green-950/40 dark:text-emerald-400">
            <CheckCircle2
              size={32}
              strokeWidth={1.8}
            />

            <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-white shadow-md dark:border-slate-900">
              <Sparkles size={11} />
            </span>
          </div>
        </div>

        {/* Content */}
        <span className="mb-2 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
          All clear
        </span>

        <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          You're all caught up!
        </h3>

        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
          Great work. You've cleared everything from
          your current task view.
        </p>

        {/* Small motivational footer */}
        <div className="mt-7 flex items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50 px-4 py-2.5 text-xs font-medium text-slate-500 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400">
          <ArrowDown
            size={14}
            className="text-emerald-500"
          />
          Ready for your next task
        </div>
      </div>
    </div>
  );
}
