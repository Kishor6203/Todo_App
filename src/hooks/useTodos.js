import { useCallback, useEffect, useMemo, useState } from "react";
import {
  TODO_STORAGE_KEY,
  createTodo,
  loadTodos,
  normalizeTodos,
  saveTodos,
} from "../utils/todoUtils";

const createInitialTodos = () => {
  const now = new Date().toISOString();

  return [
    {
      id: "demo-1",
      title: "Welcome to your Todo app",
      description: "Edit or delete this task to get started.",
      priority: "high",
      category: "Personal",
      dueDate: "",
      completed: false,
      createdAt: now,
      completedAt: null,
    },
    {
      id: "demo-2",
      title: "Learn React",
      description: "Build reusable components and manage application state.",
      priority: "medium",
      category: "Work",
      dueDate: "",
      completed: false,
      createdAt: now,
      completedAt: null,
    },
  ];
};

export function useTodos() {
  const [todos, setTodos] = useState(() => {
    const saved = loadTodos(TODO_STORAGE_KEY);
    return saved.length ? saved : createInitialTodos();
  });

  useEffect(() => {
    saveTodos(todos, TODO_STORAGE_KEY);
  }, [todos]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleStorageChange = (event) => {
      if (event.key !== TODO_STORAGE_KEY || !event.newValue) return;

      try {
        setTodos(normalizeTodos(JSON.parse(event.newValue)));
      } catch {
        // Ignore invalid external storage data.
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const addTodo = useCallback((todoData) => {
    if (!todoData?.title?.trim()) return null;

    const todo = createTodo(todoData);
    setTodos((current) => [todo, ...current]);

    return todo;
  }, []);

  const updateTodo = useCallback((id, updates = {}) => {
    if (!id) return;

    setTodos((current) =>
      current.map((todo) => {
        if (todo.id !== id) return todo;

        const next = { ...todo, ...updates };

        if (typeof next.title === "string") {
          next.title = next.title.trim();
        }

        if (!next.title) return todo;

        if (typeof next.description === "string") {
          next.description = next.description.trim();
        }

        next.completedAt = next.completed
          ? next.completedAt || new Date().toISOString()
          : null;

        return next;
      })
    );
  }, []);

  const deleteTodo = useCallback((id) => {
    if (!id) return;
    setTodos((current) => current.filter((todo) => todo.id !== id));
  }, []);

  const toggleTodo = useCallback((id) => {
    if (!id) return;

    setTodos((current) =>
      current.map((todo) => {
        if (todo.id !== id) return todo;

        const completed = !todo.completed;

        return {
          ...todo,
          completed,
          completedAt: completed ? new Date().toISOString() : null,
        };
      })
    );
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((current) => current.filter((todo) => !todo.completed));
  }, []);

  const deleteAll = useCallback(() => {
    setTodos([]);
  }, []);

  const restoreDemoTodos = useCallback(() => {
    setTodos(createInitialTodos());
  }, []);

  const statistics = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((todo) => todo.completed).length;
    const active = total - completed;

    const highPriority = todos.filter(
      (todo) => !todo.completed && todo.priority === "high"
    ).length;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const overdue = todos.filter((todo) => {
      if (todo.completed || !todo.dueDate) return false;

      const due = new Date(`${todo.dueDate}T00:00:00`);
      return !Number.isNaN(due.getTime()) && due < today;
    }).length;

    return {
      total,
      active,
      completed,
      highPriority,
      overdue,
      completionRate: total ? Math.round((completed / total) * 100) : 0,
    };
  }, [todos]);

  return {
    todos,
    statistics,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearCompleted,
    deleteAll,
    restoreDemoTodos,
  };
}
