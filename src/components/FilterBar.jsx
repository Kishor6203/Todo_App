import {
  Search,
  SlidersHorizontal,
  X,
  ListFilter,
  CheckCircle2,
  Circle,
  Layers3,
  ArrowDownUp,
  ChevronDown,
} from "lucide-react";

export default function FilterBar({
  search,
  setSearch,
  filter,
  setFilter,
  category,
  setCategory,
  sort,
  setSort,
}) {
  const hasFilters =
    search.trim() ||
    filter !== "all" ||
    category !== "all";

  const clearFilters = () => {
    setSearch("");
    setFilter("all");
    setCategory("all");
    setSort("newest");
  };

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-lg shadow-slate-200/30 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
      {/* Top accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />

      <div className="relative p-4 sm:p-5">
        {/* Header */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
              <ListFilter size={17} />
            </div>

            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Find your tasks
              </h2>

              <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                Search, filter and organize your workspace
              </p>
            </div>
          </div>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <X size={13} />
              Clear filters
            </button>
          )}
        </div>

        {/* Controls */}
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto_auto_auto]">
          {/* Search */}
          <div className="relative">
            <Search
              size={17}
              strokeWidth={2}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search tasks, descriptions..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-10 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950/60 dark:text-white dark:placeholder:text-slate-500 dark:hover:border-slate-600 dark:focus:border-blue-500 dark:focus:bg-slate-950"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Status */}
          <div className="relative">
            <Circle
              size={14}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-blue-500"
            />

            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value)
              }
              className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/70 pl-9 pr-9 text-sm font-semibold text-slate-700 outline-none transition-all hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 lg:w-40 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-200 dark:hover:border-slate-600 dark:focus:border-blue-500"
            >
              <option value="all">All tasks</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>

            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>

          {/* Category */}
          <div className="relative">
            <Layers3
              size={14}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-violet-500"
            />

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/70 pl-9 pr-9 text-sm font-semibold text-slate-700 outline-none transition-all hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 lg:w-44 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-200 dark:hover:border-slate-600 dark:focus:border-blue-500"
            >
              <option value="all">
                All categories
              </option>
              <option value="Personal">
                Personal
              </option>
              <option value="Work">Work</option>
              <option value="Shopping">
                Shopping
              </option>
              <option value="Study">Study</option>
              <option value="Health">Health</option>
            </select>

            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <ArrowDownUp
              size={14}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-amber-500"
            />

            <select
              value={sort}
              onChange={(e) =>
                setSort(e.target.value)
              }
              className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/70 pl-9 pr-9 text-sm font-semibold text-slate-700 outline-none transition-all hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 lg:w-48 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-200 dark:hover:border-slate-600 dark:focus:border-blue-500"
            >
              <option value="newest">
                Newest first
              </option>
              <option value="oldest">
                Oldest first
              </option>
              <option value="priority">
                Priority
              </option>
              <option value="dueDate">
                Due date
              </option>
            </select>

            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
        </div>

        {/* Active filter chips */}
        {hasFilters && (
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Active:
            </span>

            {search.trim() && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                <Search size={10} />
                "{search}"
              </span>
            )}

            {filter !== "all" && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-semibold capitalize text-violet-700 dark:bg-violet-950/50 dark:text-violet-400">
                {filter}
              </span>
            )}

            {category !== "all" && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
                {category}
              </span>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
