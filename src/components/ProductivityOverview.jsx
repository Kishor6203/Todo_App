import {
    CalendarDays,
    Clock3,
    AlertTriangle,
    TrendingUp,
    CheckCircle2,
  } from "lucide-react";
  
  import { isOverdue } from "../utils/todoUtils";
  
  export default function ProductivityOverview({ todos }) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const todayString = today.toISOString().split("T")[0];
  
    const todayTasks = todos.filter(
      (todo) =>
        !todo.completed &&
        todo.dueDate === todayString
    );
  
    const upcomingTasks = todos.filter((todo) => {
      if (todo.completed || !todo.dueDate) {
        return false;
      }
  
      const due = new Date(
        `${todo.dueDate}T00:00:00`
      );
  
      return due > today;
    });
  
    const overdueTasks = todos.filter(
      (todo) => isOverdue(todo)
    );
  
    const completedTasks = todos.filter(
      (todo) => todo.completed
    );
  
    /*
     * Build the last 7 days for the productivity chart.
     */
    const weeklyData = Array.from(
      { length: 7 },
      (_, index) => {
        const date = new Date(today);
  
        date.setDate(
          today.getDate() - (6 - index)
        );
  
        const dateString =
          date.toISOString().split("T")[0];
  
        const completed = completedTasks.filter(
          (todo) => {
            if (!todo.completedAt) {
              return false;
            }
  
            return (
              todo.completedAt.split("T")[0] ===
              dateString
            );
          }
        ).length;
  
        return {
          date,
          dateString,
          completed,
          label: date.toLocaleDateString("en-US", {
            weekday: "short",
          }),
        };
      }
    );
  
    const maxCompleted = Math.max(
      ...weeklyData.map((day) => day.completed),
      1
    );
  
    const totalCompletedThisWeek =
      weeklyData.reduce(
        (sum, day) => sum + day.completed,
        0
      );
  
    const cards = [
      {
        label: "Today",
        value: todayTasks.length,
        description: "Due today",
        icon: CalendarDays,
        iconStyle:
          "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400",
        glow: "bg-blue-500/10",
      },
      {
        label: "Upcoming",
        value: upcomingTasks.length,
        description: "Coming next",
        icon: Clock3,
        iconStyle:
          "bg-violet-50 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400",
        glow: "bg-violet-500/10",
      },
      {
        label: "Overdue",
        value: overdueTasks.length,
        description: "Needs attention",
        icon: AlertTriangle,
        iconStyle:
          "bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400",
        glow: "bg-red-500/10",
      },
    ];
  
    return (
      <section className="space-y-4">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-3 px-1">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp
                size={16}
                className="text-blue-500"
              />
  
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Productivity
              </h2>
            </div>
  
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
              Stay ahead of deadlines and track your
              weekly progress.
            </p>
          </div>
  
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-400">
            <CheckCircle2 size={13} />
            {totalCompletedThisWeek} completed this week
          </div>
        </div>
  
        {/* Today / Upcoming / Overdue */}
        <div className="grid gap-3 md:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
  
            return (
              <div
                key={card.label}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-black/20"
              >
                <div
                  className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl ${card.glow}`}
                />
  
                <div className="relative flex items-start justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.iconStyle}`}
                  >
                    <Icon size={19} />
                  </div>
  
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {card.description}
                  </span>
                </div>
  
                <div className="relative mt-5">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {card.label}
                  </p>
  
                  <p className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                    {card.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
  
        {/* Weekly chart */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Weekly activity
              </h3>
  
              <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                Tasks completed over the last 7 days.
              </p>
            </div>
  
            <div className="rounded-xl bg-blue-50 px-3 py-2 dark:bg-blue-950/40">
              <p className="text-lg font-extrabold text-blue-600 dark:text-blue-400">
                {totalCompletedThisWeek}
              </p>
  
              <p className="text-[9px] font-bold uppercase tracking-wider text-blue-500/70">
                Completed
              </p>
            </div>
          </div>
  
          <div className="mt-7">
            <div className="flex h-40 items-end justify-between gap-2 sm:gap-4">
              {weeklyData.map((day) => {
                const height =
                  day.completed === 0
                    ? 5
                    : Math.max(
                        (day.completed /
                          maxCompleted) *
                          100,
                        10
                      );
  
                const isToday =
                  day.dateString === todayString;
  
                return (
                  <div
                    key={day.dateString}
                    className="flex h-full flex-1 flex-col items-center justify-end"
                  >
                    <div className="mb-2 text-[10px] font-bold text-slate-400">
                      {day.completed > 0
                        ? day.completed
                        : ""}
                    </div>
  
                    <div className="flex h-full w-full items-end justify-center">
                      <div
                        className={`w-full max-w-9 rounded-t-lg transition-all duration-700 ${
                          isToday
                            ? "bg-gradient-to-t from-blue-600 to-violet-500 shadow-lg shadow-blue-500/20"
                            : "bg-slate-200 dark:bg-slate-800"
                        }`}
                        style={{
                          height: `${height}%`,
                        }}
                        title={`${day.completed} completed on ${day.label}`}
                      />
                    </div>
  
                    <div
                      className={`mt-3 text-[10px] font-bold ${
                        isToday
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-slate-400"
                      }`}
                    >
                      {day.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
  
          {/* Chart footer */}
          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
            <span className="text-[10px] font-medium text-slate-400">
              Last 7 days
            </span>
  
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-500" />
              Today
            </span>
          </div>
        </div>
      </section>
    );
  }
  