export const TODO_STORAGE_KEY = "industry-todo-app";

export const TODO_CATEGORIES = [
  "Personal",
  "Work",
  "Shopping",
  "Study",
  "Health",
];

export const TODO_PRIORITIES = [
  "low",
  "medium",
  "high",
];

export const priorityOrder = {
  high: 1,
  medium: 2,
  low: 3,
};

/**
 * Generate a unique todo ID.
 */
export const generateId = () => {
  return `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 11)}`;
};

/**
 * Safely trim a value.
 */
const cleanString = (value) => {
  return typeof value === "string" ? value.trim() : "";
};

/**
 * Create a new todo object.
 */
export const createTodo = ({
  title,
  description = "",
  priority = "medium",
  category = "Personal",
  dueDate = "",
}) => {
  const now = new Date().toISOString();

  return {
    id: generateId(),
    title: cleanString(title),
    description: cleanString(description),
    priority: TODO_PRIORITIES.includes(priority)
      ? priority
      : "medium",
    category: TODO_CATEGORIES.includes(category)
      ? category
      : "Personal",
    dueDate:
      typeof dueDate === "string" ? dueDate : "",
    completed: false,
    createdAt: now,
    completedAt: null,
  };
};

/**
 * Validate and normalize a todo loaded from storage.
 *
 * This prevents malformed localStorage data from
 * crashing the application.
 */
export const normalizeTodo = (todo) => {
  if (!todo || typeof todo !== "object") {
    return null;
  }

  const title = cleanString(todo.title);

  if (!title) {
    return null;
  }

  return {
    id:
      typeof todo.id === "string" && todo.id
        ? todo.id
        : generateId(),

    title,

    description: cleanString(todo.description),

    priority: TODO_PRIORITIES.includes(todo.priority)
      ? todo.priority
      : "medium",

    category: TODO_CATEGORIES.includes(todo.category)
      ? todo.category
      : "Personal",

    dueDate:
      typeof todo.dueDate === "string"
        ? todo.dueDate
        : "",

    completed: Boolean(todo.completed),

    createdAt:
      typeof todo.createdAt === "string"
        ? todo.createdAt
        : new Date().toISOString(),

    completedAt:
      todo.completed && typeof todo.completedAt === "string"
        ? todo.completedAt
        : null,
  };
};

/**
 * Normalize an entire todo collection.
 */
export const normalizeTodos = (todos) => {
  if (!Array.isArray(todos)) {
    return [];
  }

  return todos
    .map(normalizeTodo)
    .filter(Boolean);
};

/**
 * Check whether a todo is overdue.
 */
export const isOverdue = (todo) => {
  if (!todo?.dueDate || todo.completed) {
    return false;
  }

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const due = new Date(
    `${todo.dueDate}T00:00:00`
  );

  if (Number.isNaN(due.getTime())) {
    return false;
  }

  return due < today;
};

/**
 * Format a date for the UI.
 */
export const formatDueDate = (date) => {
  if (!date) {
    return "";
  }

  const parsedDate = new Date(
    `${date}T00:00:00`
  );

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
};

/**
 * Safely load todos from localStorage.
 */
export const loadTodos = (storageKey = TODO_STORAGE_KEY) => {
  try {
    if (typeof window === "undefined") {
      return [];
    }

    const saved = window.localStorage.getItem(
      storageKey
    );

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    return normalizeTodos(parsed);
  } catch {
    return [];
  }
};

/**
 * Safely save todos to localStorage.
 */
export const saveTodos = (
  todos,
  storageKey = TODO_STORAGE_KEY
) => {
  try {
    if (typeof window === "undefined") {
      return false;
    }

    window.localStorage.setItem(
      storageKey,
      JSON.stringify(todos)
    );

    return true;
  } catch {
    return false;
  }
};
