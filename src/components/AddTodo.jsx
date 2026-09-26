import { useState } from "react";
import {
  CalendarDays,
  Plus,
  Sparkles,
  Flag,
  Tag,
  ChevronDown,
} from "lucide-react";

const defaultForm = {
  title: "",
  description: "",
  priority: "medium",
  category: "Personal",
  dueDate: "",
};

const priorityColors = {
  low: "text-emerald-600 dark:text-emerald-400",
  medium: "text-amber-600 dark:text-amber-400",
  high: "text-red-600 dark:text-red-400",
};

export default function AddTodo({ onAdd }) {
  const [form, setForm] = useState(defaultForm);

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      return;
    }

    onAdd(form);
    setForm(defaultForm);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20"
    >
      {/* Premium ambient background */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl transition-opacity duration-500 group-hover:bg-blue-500/15" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

      {/* Top gradient */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-blue-500" />

      <div className="relative p-5 sm:p-7">
        {/* Header */}
        <div className="mb-7 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-500/20">
              <Sparkles size={20} strokeWidth={2.2} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white sm:text-xl">
                  Create a task
                </h2>

                <span className="hidden rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-blue-600 sm:inline-flex dark:border-blue-900/60 dark:bg-blue-950/50 dark:text-blue-400">
                  New
                </span>
              </div>

              <p className="mt-1 text-sm leading-5 text-slate-500 dark:text-slate-400">
                Capture your next priority and keep moving forward.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {/* Title */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="todo-title"
                className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300"
              >
                Task title
              </label>

              <span className="text-[10px] font-medium tabular-nums text-slate-400">
                {form.title.length}/120
              </span>
            </div>

            <div className="relative">
              <input
                id="todo-title"
                value={form.title}
                onChange={(e) =>
                  updateField("title", e.target.value)
                }
                placeholder="What needs to be done?"
                maxLength={120}
                autoFocus
                className="h-13 w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 text-[15px] font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950/60 dark:text-white dark:placeholder:text-slate-500 dark:hover:border-slate-600 dark:focus:border-blue-500 dark:focus:bg-slate-950"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="todo-description"
                className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300"
              >
                Description
                <span className="ml-1.5 font-normal normal-case tracking-normal text-slate-400">
                  Optional
                </span>
              </label>

              <span className="text-[10px] font-medium tabular-nums text-slate-400">
                {form.description.length}/500
              </span>
            </div>

            <textarea
              id="todo-description"
              value={form.description}
              onChange={(e) =>
                updateField("description", e.target.value)
              }
              placeholder="Add context, notes, or useful details..."
              maxLength={500}
              className="min-h-28 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 text-sm leading-6 text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950/60 dark:text-white dark:placeholder:text-slate-500 dark:hover:border-slate-600 dark:focus:border-blue-500 dark:focus:bg-slate-950"
            />
          </div>

          {/* Metadata */}
          <div className="grid gap-3 sm:grid-cols-3">
            {/* Priority */}
            <div>
              <label
                htmlFor="todo-priority"
                className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300"
              >
                <Flag size={13} />
                Priority
              </label>

              <div className="relative">
                <select
                  id="todo-priority"
                  value={form.priority}
                  onChange={(e) =>
                    updateField("priority", e.target.value)
                  }
                  className={`h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 pr-9 text-sm font-semibold outline-none transition-all hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950/60 dark:hover:border-slate-600 dark:focus:border-blue-500 ${
                    priorityColors[form.priority]
                  }`}
                >
                  <option value="low">Low priority</option>
                  <option value="medium">Medium priority</option>
                  <option value="high">High priority</option>
                </select>

                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="todo-category"
                className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300"
              >
                <Tag size={13} />
                Category
              </label>

              <div className="relative">
                <select
                  id="todo-category"
                  value={form.category}
                  onChange={(e) =>
                    updateField("category", e.target.value)
                  }
                  className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 pr-9 text-sm font-medium text-slate-700 outline-none transition-all hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-200 dark:hover:border-slate-600 dark:focus:border-blue-500"
                >
                  <option>Personal</option>
                  <option>Work</option>
                  <option>Shopping</option>
                  <option>Study</option>
                  <option>Health</option>
                </select>

                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>

            {/* Due date */}
            <div>
              <label
                htmlFor="todo-date"
                className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300"
              >
                <CalendarDays size={13} />
                Due date
              </label>

              <div className="relative">
                <CalendarDays
                  size={16}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="todo-date"
                  type="date"
                  value={form.dueDate}
                  onChange={(e) =>
                    updateField("dueDate", e.target.value)
                  }
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-3 text-sm font-medium text-slate-700 outline-none transition-all hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-200 dark:hover:border-slate-600 dark:focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-1">
            <button
              type="submit"
              disabled={!form.title.trim()}
              className="group/button relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-blue-600 to-violet-600 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/25 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-40 disabled:shadow-none"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 -translate-x-full transition-transform duration-700 group-hover/button:translate-x-full" />

              <Plus
                size={19}
                strokeWidth={2.7}
                className="relative transition-transform duration-300 group-hover/button:rotate-90"
              />

              <span className="relative">Add Task</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
