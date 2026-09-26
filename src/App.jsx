import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  CheckCheck,
  LayoutDashboard,
  ListChecks,
  Sparkles,
  Trash2,
} from "lucide-react";

import Header from "./components/Header";
import AddTodo from "./components/AddTodo";
import TodoStats from "./components/TodoStats";
import ProductivityOverview from "./components/ProductivityOverview";
import FilterBar from "./components/FilterBar";
import TodoList from "./components/TodoList";
import AIChat from "./components/AIChat";

import { priorityOrder } from "./utils/todoUtils";
import { useTodos } from "./hooks/useTodos";

const DARK_MODE_KEY = "todo-dark-mode";

export default function App() {
  const {
    todos,
    statistics,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearCompleted,
    deleteAll,
  } = useTodos();

  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem(DARK_MODE_KEY) === "true"
  );
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem(DARK_MODE_KEY, String(darkMode));
  }, [darkMode]);

  const filteredTodos = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = todos.filter((todo) => {
      const title = todo.title?.toLowerCase() || "";
      const description = todo.description?.toLowerCase() || "";

      const matchesSearch =
        !query ||
        title.includes(query) ||
        description.includes(query);

      const matchesFilter =
        filter === "all" ||
        (filter === "active" && !todo.completed) ||
        (filter === "completed" && todo.completed);

      const matchesCategory =
        category === "all" || todo.category === category;

      return matchesSearch && matchesFilter && matchesCategory;
    });

    result.sort((a, b) => {
      switch (sort) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);

        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);

        case "priority":
          return (
            (priorityOrder[a.priority] ?? 99) -
            (priorityOrder[b.priority] ?? 99)
          );

        case "dueDate":
          if (!a.dueDate) return b.dueDate ? 1 : 0;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);

        default:
          return 0;
      }
    });

    return result;
  }, [todos, search, filter, category, sort]);

  const completionRate = statistics.total
    ? Math.round((statistics.completed / statistics.total) * 100)
    : 0;

  const hasFilters =
    Boolean(search.trim()) ||
    filter !== "all" ||
    category !== "all";

  const hour = new Date().getHours();
  const greeting =
    hour < 12
      ? "Good morning"
      : hour < 18
      ? "Good afternoon"
      : "Good evening";

  const resetFilters = () => {
    setSearch("");
    setFilter("all");
    setCategory("all");
    setSort("newest");
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute -left-48 -top-48 h-[550px] w-[550px] rounded-full bg-blue-500/[0.05] blur-3xl dark:bg-blue-500/[0.08]" />
        <div className="absolute right-[-200px] top-[15%] h-[550px] w-[550px] rounded-full bg-violet-500/[0.045] blur-3xl dark:bg-violet-500/[0.07]" />
        <div className="absolute bottom-[-250px] left-[25%] h-[550px] w-[550px] rounded-full bg-cyan-500/[0.035] blur-3xl dark:bg-cyan-500/[0.05]" />
      </div>

      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8 lg:pt-8">
        <section className="relative mb-7 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/30 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-400" />
          <div className="pointer-events-none absolute -right-32 -top-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative flex flex-col gap-8 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-600 dark:border-blue-900/60 dark:bg-blue-950/50 dark:text-blue-400">
                <Sparkles size={12} />
                AI powered workspace
              </div>

              <p className="text-sm font-semibold text-slate-400">
                {greeting} 👋
              </p>

              <h1 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                Let's get things
                <span className="block bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-500 bg-clip-text text-transparent">
                  done.
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base">
                Plan your work, prioritize what matters, and let TaskFlow AI help you stay focused.
              </p>

              <div className="mt-7 max-w-lg">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ListChecks size={14} className="text-blue-500" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Overall progress
                    </span>
                  </div>
                  <span className="text-xs font-bold">{completionRate}%</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 via-violet-500 to-emerald-500 transition-all duration-700"
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="shrink-0 lg:w-64">
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/50">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-500/20">
                    <LayoutDashboard size={18} />
                  </div>

                  <span className="rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                    Active
                  </span>
                </div>

                <p className="mt-5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Active workload
                </p>
                <p className="mt-1 text-4xl font-extrabold">{statistics.active}</p>
                <p className="mt-1 text-[11px] text-slate-400">
                  tasks waiting for you
                </p>

                <div className="mt-4 flex items-center gap-2 border-t border-slate-200 pt-4 dark:border-slate-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    {statistics.highPriority} high priority
                  </span>
                  <ArrowUpRight size={12} className="ml-auto text-slate-400" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-7">
          <TodoStats statistics={statistics} />
          <ProductivityOverview todos={todos} />

          <div className="grid items-start gap-7 lg:grid-cols-[360px_minmax(0,1fr)]">
            <aside>
              <div className="lg:sticky lg:top-24">
                <AddTodo onAdd={addTodo} />
              </div>
            </aside>

            <section className="min-w-0 space-y-5">
              <FilterBar
                search={search}
                setSearch={setSearch}
                filter={filter}
                setFilter={setFilter}
                category={category}
                setCategory={setCategory}
                sort={sort}
                setSort={setSort}
              />

              <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/90">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-bold">Your tasks</h2>
                      <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                        {filteredTodos.length}
                      </span>
                    </div>

                    <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                      {hasFilters
                        ? `Showing ${filteredTodos.length} of ${todos.length} tasks`
                        : `${todos.length} ${todos.length === 1 ? "task" : "tasks"} in your workspace`}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {statistics.completed > 0 && (
                      <button
                        type="button"
                        onClick={clearCompleted}
                        className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                      >
                        <CheckCheck size={14} />
                        Clear completed
                      </button>
                    )}

                    {todos.length > 0 && (
                      <button
                        type="button"
                        onClick={deleteAll}
                        className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 text-xs font-semibold text-red-600 shadow-sm transition hover:bg-red-50 dark:border-red-900/60 dark:bg-slate-900 dark:text-red-400 dark:hover:bg-red-950/30"
                      >
                        <Trash2 size={14} />
                        Clear all
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {filteredTodos.length === 0 && todos.length > 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 px-6 py-14 text-center dark:border-slate-700 dark:bg-slate-900/60">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                    <ListChecks size={22} className="text-slate-400" />
                  </div>

                  <h3 className="mt-4 text-sm font-bold">No matching tasks</h3>

                  <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-500 dark:text-slate-400">
                    Nothing matches your current search or filters.
                  </p>

                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-5 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                  >
                    Reset filters
                  </button>
                </div>
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onUpdate={updateTodo}
                />
              )}
            </section>
          </div>
        </div>
      </main>

      <AIChat todos={todos} />

      <footer className="border-t border-slate-200/80 bg-white/70 dark:border-slate-800 dark:bg-slate-950/70">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-7 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 text-white">
              <LayoutDashboard size={14} />
            </div>

            <div>
              <p className="text-xs font-bold">TaskFlow AI</p>
              <p className="text-[10px] text-slate-400">
                Intelligent personal productivity
              </p>
            </div>
          </div>

          <p className="text-[10px] font-medium text-slate-400">
            Built with React, Tailwind CSS & AI
          </p>
        </div>
      </footer>
    </div>
  );
}
