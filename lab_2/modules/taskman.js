const STORAGE_KEY = "tasks";

function readTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Не удалось прочитать задачи из localStorage:", error);
    return [];
  }
}

function writeTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Не удалось сохранить задачи в localStorage:", error);
  }
}

function createId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function normalizeText(text) {
  return String(text ?? "").trim();
}

function normalizeDate(value, fallback) {
  if (!value) {
    return fallback;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? fallback : date.toISOString();
}

export function getTasks() {
  return readTasks();
}

export function addTask(text) {
  const normalizedText = normalizeText(text);
  if (!normalizedText) {
    return null;
  }

  const tasks = readTasks();
  const task = {
    id: createId(),
    text: normalizedText,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(task);
  writeTasks(tasks);
  return task;
}

export function removeTask(id) {
  const tasks = readTasks();
  const nextTasks = tasks.filter((task) => task.id !== id);

  if (nextTasks.length === tasks.length) {
    return false;
  }

  writeTasks(nextTasks);
  return true;
}

export function toggleTask(id) {
  const tasks = readTasks();
  let toggledTask = null;

  const nextTasks = tasks.map((task) => {
    if (task.id !== id) {
      return task;
    }

    toggledTask = { ...task, completed: !task.completed };
    return toggledTask;
  });

  if (!toggledTask) {
    return null;
  }

  writeTasks(nextTasks);
  return toggledTask;
}

export function updateTask(id, changes = {}) {
  const tasks = readTasks();
  let updatedTask = null;

  const nextTasks = tasks.map((task) => {
    if (task.id !== id) {
      return task;
    }

    const text = changes.text === undefined ? task.text : normalizeText(changes.text);
    if (!text) {
      return task;
    }

    const createdAt =
      changes.createdAt === undefined
        ? task.createdAt
        : normalizeDate(changes.createdAt, task.createdAt);

    updatedTask = { ...task, text, createdAt };
    return updatedTask;
  });

  if (!updatedTask) {
    return null;
  }

  writeTasks(nextTasks);
  return updatedTask;
}

export function moveTask(draggedId, targetId) {
  if (draggedId === targetId) {
    return false;
  }

  const tasks = readTasks();
  const fromIndex = tasks.findIndex((task) => task.id === draggedId);
  const toIndex = tasks.findIndex((task) => task.id === targetId);

  if (fromIndex === -1 || toIndex === -1) {
    return false;
  }

  const [movedTask] = tasks.splice(fromIndex, 1);
  tasks.splice(toIndex, 0, movedTask);
  writeTasks(tasks);
  return true;
}

export function filterTasks(tasks, filter = "all", searchTerm = "") {
  const normalizedSearch = String(searchTerm ?? "").trim().toLowerCase();

  return tasks.filter((task) => {
    const matchesStatus =
      filter === "active" ? !task.completed :
      filter === "completed" ? task.completed :
      true;

    const matchesSearch = String(task.text ?? "")
      .toLowerCase()
      .includes(normalizedSearch);
    return matchesStatus && matchesSearch;
  });
}

export function sortTasks(tasks, sortBy = "manual", direction = sortBy === "date" ? "desc" : "asc") {
  if (sortBy !== "date" && sortBy !== "text") {
    return [...tasks];
  }

  const sign = direction === "desc" ? -1 : 1;

  return [...tasks].sort((first, second) => {
    const result =
      sortBy === "date"
        ? new Date(first.createdAt) - new Date(second.createdAt)
        : String(first.text ?? "").localeCompare(String(second.text ?? ""), "ru", {
            sensitivity: "base",
          });

    return result * sign;
  });
}

export function getStats(tasks) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;

  return { total, completed, active: total - completed };
}
