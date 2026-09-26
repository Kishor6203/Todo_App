import { useState } from "react";
import {
  Calendar,
  Check,
  Edit3,
  Trash2,
  X,
  Flag,
  Tag,
  ChevronDown,
} from "lucide-react";

import {
  formatDueDate,
  isOverdue,
} from "../utils/todoUtils";

const priorityStyles = {
  high: {
    badge:
      "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200/70 dark:bg-red-950/40 dark:text-red-400 dark:ring-red-900/60",
    dot: "bg-red-500",
    accent: "bg-red-500",
  },
  medium: {
    badge:
      "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200/70 dark:bg-amber-950/40 dark:text-amber-400 dark:ring-amber-900/60",
    dot: "bg-amber-500",
    accent: "bg-amber-500",
  },
  low: {
    badge:
      "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200/70 dark:bg-emerald-950/40 dark:text-emerald-400 dark:ring-emerald-900/60",
    dot: "bg-emerald-500",
    accent: "bg-emerald-500",
  },
};

const categories = [
  "Personal",
  "Work",
  "Shopping",
  "Study",
  "Health",
];

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onUpdate,
}) {
  const [editing, setEditing] = useState(false);

  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(
    todo.description
  );
  const [editPriority, setEditPriority] = useState(
    todo.priority
  );
  const [editCategory, setEditCategory] = useState(
    todo.category
  );
  const [editDueDate, setEditDueDate] = useState(
    todo.dueDate
  );

  const priority =
    priorityStyles[todo.priority] ||
    priorityStyles.medium;

  const overdue = isOverdue(todo);

  const startEditing = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description);
    setEditPriority(todo.priority);
    setEditCategory(todo.category);
    setEditDueDate(todo.dueDate);
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description);
    setEditPriority(todo.priority);
    setEditCategory(todo.category);
    setEditDueDate(todo.dueDate);
    setEditing(false);
  };

  const saveEdit = () => {
    if (!editTitle.trim()) {
      return;
    }

    onUpdate(todo.id, {
      title: editTitle.trim(),
      description: editDescription.trim(),
      priority: editPriority,
      category: editCategory,
      dueDate: editDueDate,
    });

    setEditing(false);
  };

  if (editing) {
    return (
      <article className="relative overflow-hidden rounded-2xl border border-blue-200/80 bg-white p-5 shadow-xl shadow-blue-500/5 ring-4 ring-blue-500/5 dark:border-blue-900/60 dark:bg-slate-900 sm:p-6">
        {/* Edit accent */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-blue-500" />

        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
            <Edit3 size={17} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Edit task
            </h3>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Update your task details.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Task title
            </label>

            <input
              value={editTitle}
              onChange={(e) =>
                setEditTitle(e.target.value)
              }
              maxLength={120}
              autoFocus
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm font-medium text-slate-900 outline-none transition-all hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:hover:border-slate-600 dark:focus:border-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Description
            </label>

            <textarea
              value={editDescription}
              onChange={(e) =>
                setEditDescription(e.target.value)
              }
              maxLength={500}
              className="min-h-24 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm leading-6 text-slate-900 outline-none transition-all hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:hover:border-slate-600 dark:focus:border-blue-500"
            />
          </div>

          {/* Metadata */}
          <div className="grid gap-3 sm:grid-cols-3">
            {/* Priority */}
            <div>
              <label className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                <Flag size={13} />
                Priority
              </label>

              <div className="relative">
                <select
                  value={editPriority}
                  onChange={(e) =>
                    setEditPriority(e.target.value)
                  }
                  className="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3 pr-8 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>

                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                <Tag size={13} />
                Category
              </label>

              <div className="relative">
                <select
                  value={editCategory}
                  onChange={(e) =>
                    setEditCategory(e.target.value)
                  }
                  className="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3 pr-8 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                >
                  {categories.map((category) => (
                    <option key={category}>
                      {category}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>

            {/* Due date */}
            <div>
              <label className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                <Calendar size={13} />
                Due date
              </label>

              <div className="relative">
                <Calendar
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="date"
                  value={editDueDate}
                  onChange={(e) =>
                    setEditDueDate(e.target.value)
                  }
                  className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-2 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={cancelEdit}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <X size={16} />
              Cancel
            </button>

            <button
              type="button"
              onClick={saveEdit}
              disabled={!editTitle.trim()}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 text-sm font-semibold text-white shadow-md shadow-blue-500/15 transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
            >
              <Check size={16} />
              Save changes
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border bg-white p-4 shadow-sm transition-all duration-300 sm:p-5 dark:bg-slate-900 ${
        todo.completed
          ? "border-slate-200/60 opacity-70 dark:border-slate-800/60"
          : "border-slate-200/80 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/40 dark:border-slate-800 dark:hover:border-slate-700 dark:hover:shadow-black/20"
      }`}
    >
      {/* Priority accent */}
      {!todo.completed && (
        <div
          className={`absolute bottom-4 left-0 top-4 w-1 rounded-r-full ${priority.accent}`}
        />
      )}

      <div className="flex gap-3.5 sm:gap-4">
        {/* Complete */}
        <button
          type="button"
          onClick={() => onToggle(todo.id)}
          className={`relative mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 ${
            todo.completed
              ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-500/20"
              : "border-slate-300 bg-white text-transparent hover:scale-110 hover:border-blue-500 dark:border-slate-600 dark:bg-slate-900 dark:hover:border-blue-500"
          }`}
          aria-label={
            todo.completed
              ? "Mark as active"
              : "Mark as completed"
          }
        >
          {todo.completed && (
            <Check
              size={13}
              strokeWidth={3}
            />
          )}
        </button>

        <div className="min-w-0 flex-1">
          {/* Main content */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h3
                className={`break-words text-[15px] font-semibold leading-6 ${
                  todo.completed
                    ? "text-slate-400 line-through decoration-slate-400/70"
                    : "text-slate-900 dark:text-white"
                }`}
              >
                {todo.title}
              </h3>

              {todo.description && (
                <p
                  className={`mt-1.5 break-words text-sm leading-6 ${
                    todo.completed
                      ? "text-slate-400"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {todo.description}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-0.5 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
              <button
                type="button"
                onClick={startEditing}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                aria-label="Edit task"
                title="Edit task"
              >
                <Edit3 size={15} />
              </button>

              <button
                type="button"
                onClick={() => onDelete(todo.id)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-400"
                aria-label="Delete task"
                title="Delete task"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>

          {/* Metadata */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {/* Priority */}
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold capitalize ${priority.badge}`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${priority.dot}`}
              />
              {todo.priority}
            </span>

            {/* Category */}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600 ring-1 ring-inset ring-slate-200/70 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700">
              <Tag size={11} />
              {todo.category}
            </span>

            {/* Due date */}
            {todo.dueDate && (
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  overdue && !todo.completed
                    ? "bg-red-50 text-red-600 ring-1 ring-inset ring-red-200/70 dark:bg-red-950/40 dark:text-red-400 dark:ring-red-900/60"
                    : "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200/70 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700"
                }`}
              >
                <Calendar size={11} />

                {overdue && !todo.completed
                  ? "Overdue"
                  : formatDueDate(todo.dueDate)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Completed indicator */}
      {todo.completed && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
      )}
    </article>
  );
}
