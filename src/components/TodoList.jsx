import {
  ClipboardList,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import TodoItem from "./TodoItem";

export default function TodoList({
  todos,
  onToggle,
  onDelete,
  onUpdate,
}) {
  if (!todos.length) {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white px-6 py-14 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {/* Ambient decoration */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-violet-500/5 blur-3xl" />

        <div className="relative mx-auto flex max-w-md flex-col items-center">
          <div className="relative mb-5">
            <div className="absolute -inset-4 rounded-full bg-slate-400/10 blur-xl" />

            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 text-slate-400 shadow-sm dark:border-slate-700 dark:from-slate-800 dark:to-slate-900 dark:text-slate-500">
              <ClipboardList
                size={30}
                strokeWidth={1.7}
              />
            </div>

            <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-white shadow-md dark:border-slate-900">
              <Sparkles size={11} />
            </span>
          </div>

          <span className="mb-2 rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            Nothing here
          </span>

          <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            No tasks found
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
            Your current filters didn't return any tasks.
            Try adjusting your search or filters.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-500 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400">
            <ArrowRight
              size={14}
              className="text-blue-500"
            />
            Create a new task to get started
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-4">
      {/* Section heading */}
      <div className="flex items-center justify-between gap-3 px-1">
        <div>
          <h2 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
            Your tasks
          </h2>

          <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
            Stay focused and keep making progress.
          </p>
        </div>

        <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          {todos.length}{" "}
          {todos.length === 1 ? "task" : "tasks"}
        </div>
      </div>

      {/* Task list */}
      <div className="space-y-3">
        {todos.map((todo, index) => (
          <div
            key={todo.id}
            style={{
              animationDelay: `${Math.min(index * 45, 300)}ms`,
            }}
            className="animate-slide-up"
          >
            <TodoItem
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
