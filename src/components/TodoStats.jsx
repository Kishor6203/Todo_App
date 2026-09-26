import {
  CheckCircle2,
  Circle,
  ListTodo,
  AlertCircle,
  TrendingUp,
  Sparkles,
} from "lucide-react";

const statStyles = {
  total: {
    icon: ListTodo,
    iconBg:
      "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400",
    glow: "bg-blue-500/10",
    accent: "from-blue-500 to-cyan-400",
  },
  active: {
    icon: Circle,
    iconBg:
      "bg-violet-50 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400",
    glow: "bg-violet-500/10",
    accent: "from-violet-500 to-fuchsia-400",
  },
  completed: {
    icon: CheckCircle2,
    iconBg:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400",
    glow: "bg-emerald-500/10",
    accent: "from-emerald-500 to-teal-400",
  },
  high: {
    icon: AlertCircle,
    iconBg:
      "bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400",
    glow: "bg-red-500/10",
    accent: "from-red-500 to-orange-400",
  },
};

export default function TodoStats({ statistics }) {
  const stats = [
    {
      key: "total",
      label: "Total tasks",
      value: statistics.total,
      description: "All tasks",
    },
    {
      key: "active",
      label: "Active",
      value: statistics.active,
      description: "Still to do",
    },
    {
      key: "completed",
      label: "Completed",
      value: statistics.completed,
      description: "Successfully done",
    },
    {
      key: "high",
      label: "High priority",
      value: statistics.highPriority,
      description: "Needs attention",
    },
  ];

  const completionRate =
    statistics.total > 0
      ? Math.round(
          (statistics.completed /
            statistics.total) *
            100
        )
      : 0;

  return (
    <section className="space-y-4">
      {/* Progress header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
              Your overview
            </h2>

            <Sparkles
              size={14}
              className="text-blue-500"
            />
          </div>

          <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
            A quick snapshot of your productivity.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-emerald-200/70 bg-emerald-50 px-3 py-1.5 dark:border-emerald-900/60 dark:bg-emerald-950/40">
          <TrendingUp
            size={13}
            className="text-emerald-600 dark:text-emerald-400"
          />

          <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
            {completionRate}% complete
          </span>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = statStyles[stat.key].icon;
          const style = statStyles[stat.key];

          return (
            <div
              key={stat.key}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-black/20 sm:p-5"
            >
              {/* Glow */}
              <div
                className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl ${style.glow}`}
              />

              {/* Bottom accent */}
              <div
                className={`absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r ${style.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />

              <div className="relative">
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${style.iconBg} transition-transform duration-300 group-hover:scale-105`}
                  >
                    <Icon
                      size={19}
                      strokeWidth={2.2}
                    />
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {stat.key === "total"
                      ? "Overview"
                      : stat.key === "high"
                      ? "Urgent"
                      : "Status"}
                  </span>
                </div>

                <div className="mt-4">
                  <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </p>

                  <div className="mt-1 flex items-end justify-between gap-2">
                    <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                      {stat.value}
                    </p>
                  </div>

                  <p className="mt-1 text-[10px] font-medium text-slate-400">
                    {stat.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion progress */}
      {statistics.total > 0 && (
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                Overall progress
              </p>

              <p className="mt-0.5 text-[11px] text-slate-400">
                {statistics.completed} of{" "}
                {statistics.total} tasks completed
              </p>
            </div>

            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {completionRate}%
            </span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-500 transition-all duration-700"
              style={{
                width: `${completionRate}%`,
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
