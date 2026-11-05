import {
  getTasks,
  addTask,
  removeTask,
  toggleTask,
  updateTask,
  moveTask,
  filterTasks,
  sortTasks,
  getStats,
} from "./taskman.js";
import { setupHeaderActions } from "./etc.js";

const state = {
  filter: "all",
  sort: "manual",
  sortDirection: "asc",
  search: "",
  editingId: null,
};

const elements = {
  filterButtons: {},
};

function createElement(tagName, className = "", textContent) {
  const element = document.createElement(tagName);

  if (className) {
    element.className = className;
  }

  if (textContent !== undefined) {
    element.textContent = textContent;
  }

  return element;
}

function createButton(id, className, text) {
  const button = createElement("button", className, text);
  button.type = "button";

  if (id) {
    button.id = id;
  }

  return button;
}

function createControls() {
  const controls = createElement("div", "controls");

  const taskInput = document.createElement("input");
  taskInput.type = "text";
  taskInput.id = "taskInput";
  taskInput.placeholder = "Введите новое задание...";
  taskInput.autocomplete = "off";

  const addTaskBtn = createButton("addTaskBtn", "", "Добавить");

  controls.append(taskInput, addTaskBtn);
  elements.taskInput = taskInput;
  elements.addTaskBtn = addTaskBtn;

  return controls;
}

function createFilterControls() {
  const filterControls = createElement("div", "filter-controls");
  const filters = [
    ["all", "Все"],
    ["active", "Активные"],
    ["completed", "Завершённые"],
  ];

  filters.forEach(([filter, label]) => {
    const button = createButton(`${filter}TasksBtn`, "", label);
    button.dataset.filter = filter;
    button.classList.toggle("active", state.filter === filter);

    elements.filterButtons[filter] = button;
    filterControls.appendChild(button);
  });

  return filterControls;
}

function createSearchControls() {
  const searchSort = createElement("div", "search-sort");

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.id = "searchInput";
  searchInput.placeholder = "Поиск по задачам...";
  searchInput.autocomplete = "off";

  const sortTextBtn = createButton("sortTextBtn", "", "Сортировка по тексту");
  const sortTextIndicator = createElement("span", "sort-indicator", "↕");
  sortTextIndicator.setAttribute("aria-hidden", "true");
  sortTextBtn.appendChild(sortTextIndicator);

  const sortByDateBtn = createButton("sortByDateBtn", "", "Сортировка по дате");
  const sortByDateIndicator = createElement("span", "sort-indicator", "↕");
  sortByDateIndicator.setAttribute("aria-hidden", "true");
  sortByDateBtn.appendChild(sortByDateIndicator);

  searchSort.append(searchInput, sortTextBtn, sortByDateBtn);
  elements.searchInput = searchInput;
  elements.sortTextBtn = sortTextBtn;
  elements.sortByDateBtn = sortByDateBtn;
  elements.sortTextIndicator = sortTextIndicator;
  elements.sortByDateIndicator = sortByDateIndicator;

  return searchSort;
}

function createTaskList() {
  const taskList = document.createElement("ul");
  taskList.id = "taskList";
  taskList.className = "task-list";
  taskList.setAttribute("aria-live", "polite");

  elements.taskList = taskList;
  return taskList;
}

function createStats() {
  const stats = createElement("div", "stats");

  const tasksCount = createElement("span", "", "Заданий: 0");
  tasksCount.id = "tasksCount";

  const completedCount = createElement("span", "", "Завершено: 0");
  completedCount.id = "completedCount";

  stats.append(tasksCount, completedCount);
  elements.tasksCount = tasksCount;
  elements.completedCount = completedCount;

  return stats;
}

function createHeader() {
  const nav = document.createElement("nav");

  const left = document.createElement("ul");
  left.className = "left";

  const homeLink = document.createElement("a");
  homeLink.href = "";
  homeLink.textContent = "Список дел";
  left.appendChild(homeLink);

  const right = document.createElement("ul");
  right.className = "right";

  const clearStorageLink = document.createElement("a");
  clearStorageLink.id = "clear-storage";
  clearStorageLink.href = "#";
  clearStorageLink.title = "Очистить localStorage";

  const qrLink = document.createElement("a");
  qrLink.id = "qr-code";
  qrLink.href = "#";
  qrLink.title = "QR-код";

  const githubLink = document.createElement("a");
  githubLink.id = "github-icon";
  githubLink.href = "https://github.com/leetrat/itmo-web/tree/main/lab_2";
  githubLink.target = "_blank";
  githubLink.rel = "noopener noreferrer";
  githubLink.title = "Репозиторий на GitHub";

  right.append(clearStorageLink, qrLink, githubLink);
  nav.append(left, right);

  return nav;
}

function buildLayout() {
  document.body.appendChild(createHeader());

  const container = createElement("div", "container");
  container.appendChild(createControls());
  container.appendChild(createFilterControls());
  container.appendChild(createSearchControls());
  container.appendChild(createTaskList());
  container.appendChild(createStats());

  document.body.appendChild(container);
}

function setupEventListeners() {
  const submitTask = () => {
    const text = elements.taskInput.value.trim();
    if (!text) {
      elements.taskInput.focus();
      return;
    }

    addTask(text);
    elements.taskInput.value = "";
    elements.taskInput.focus();
    renderTaskList();
  };

  elements.addTaskBtn.addEventListener("click", submitTask);
  elements.taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      submitTask();
    }
  });

  Object.entries(elements.filterButtons).forEach(([filter, button]) => {
    button.addEventListener("click", () => {
      state.filter = filter;
      state.editingId = null;
      updateActiveFilterButton();
      renderTaskList();
    });
  });

  elements.searchInput.addEventListener("input", () => {
    state.search = elements.searchInput.value;
    state.editingId = null;
    renderTaskList();
  });

  elements.sortTextBtn.addEventListener("click", () => setSort("text"));
  elements.sortByDateBtn.addEventListener("click", () => setSort("date"));
}

function setSort(sortBy) {
  if (state.sort === sortBy) {
    state.sortDirection = state.sortDirection === "asc" ? "desc" : "asc";
  } else {
    state.sort = sortBy;
    state.sortDirection = sortBy === "date" ? "desc" : "asc";
  }

  state.editingId = null;
  updateActiveSortButton();
  renderTaskList();
}

function updateActiveFilterButton() {
  Object.entries(elements.filterButtons).forEach(([filter, button]) => {
    button.classList.toggle("active", filter === state.filter);
  });
}

function updateActiveSortButton() {
  updateSortButton(elements.sortTextBtn, elements.sortTextIndicator, "text");
  updateSortButton(elements.sortByDateBtn, elements.sortByDateIndicator, "date");
}

function updateSortButton(button, indicator, sortBy) {
  const isActive = state.sort === sortBy;

  button.classList.toggle("active", isActive);
  button.setAttribute("aria-pressed", String(isActive));

  indicator.textContent = isActive ? (state.sortDirection === "asc" ? "↑" : "↓") : "↕";
}

function reset() {
  state.filter = "all";
  state.sort = "manual";
  state.sortDirection = "asc";
  state.search = "";
  state.editingId = null;
  elements.searchInput.value = "";

  updateActiveFilterButton();
  updateActiveSortButton();
  renderTaskList();
}

function formatTaskDate(isoString) {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function toDateInputValue(isoString) {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
}

function getEmptyMessage(totalTasks) {
  if (totalTasks === 0) {
    return "Задач пока нет. Добавьте первую!";
  }

  if (state.search.trim()) {
    return "По вашему запросу ничего не найдено.";
  }

  if (state.filter === "completed") {
    return "Завершённых задач пока нет.";
  }

  if (state.filter === "active") {
    return "Активных задач пока нет.";
  }

  return "Задач не найдено.";
}

function createEditForm(task) {
  const form = document.createElement("form");
  form.className = "task-edit-form";

  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.className = "edit-text-input";
  textInput.value = task.text;
  textInput.required = true;
  textInput.setAttribute("aria-label", "Текст задачи");

  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.className = "edit-date-input";
  dateInput.value = toDateInputValue(task.createdAt);
  dateInput.setAttribute("aria-label", "Дата задачи");

  const actions = createElement("div", "edit-actions");
  const saveButton = createElement("button", "save-btn", "Сохранить");
  saveButton.type = "submit";

  const cancelButton = createElement("button", "cancel-btn", "Отмена");
  cancelButton.type = "button";
  cancelButton.addEventListener("click", () => {
    state.editingId = null;
    renderTaskList();
  });

  const cancelEditing = () => {
    state.editingId = null;
    renderTaskList();
  };

  textInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      cancelEditing();
    }
  });

  dateInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      cancelEditing();
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = textInput.value.trim();
    if (!text) {
      textInput.focus();
      return;
    }

    const createdAt = dateInput.value
      ? new Date(`${dateInput.value}T12:00:00`).toISOString()
      : task.createdAt;

    updateTask(task.id, { text, createdAt });
    state.editingId = null;
    renderTaskList();
  });

  actions.append(saveButton, cancelButton);
  form.append(textInput, dateInput, actions);

  requestAnimationFrame(() => textInput.focus());

  return form;
}

function addDragAndDrop(item, taskId) {
  item.addEventListener("dragstart", (event) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", taskId);
    item.classList.add("dragging");
  });

  item.addEventListener("dragend", () => {
    item.classList.remove("dragging");
  });

  item.addEventListener("dragover", (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    item.classList.add("drag-over");
  });

  item.addEventListener("dragleave", () => {
    item.classList.remove("drag-over");
  });

  item.addEventListener("drop", (event) => {
    event.preventDefault();
    item.classList.remove("drag-over");

    const draggedId = event.dataTransfer.getData("text/plain");
    if (!draggedId || draggedId === taskId) {
      return;
    }

    if (moveTask(draggedId, taskId)) {
      state.sort = "manual";
      state.editingId = null;
      updateActiveSortButton();
      renderTaskList();
    }
  });
}

function createTaskItem(task) {
  const item = createElement("li", "task-item");
  item.dataset.id = task.id;
  item.classList.toggle("completed", task.completed);

  if (state.editingId === task.id) {
    item.classList.add("editing");
    item.appendChild(createEditForm(task));
    return item;
  }

  item.draggable = true;

  const content = createElement("div", "task-content");

  const taskText = createElement("span", "task-text", task.text);
  const taskDate = createElement("span", "task-date", formatTaskDate(task.createdAt));
  content.append(taskText, taskDate);

  const actions = createElement("div", "task-actions");

  const editButton = createElement("button", "edit-btn", "Изменить");
  editButton.type = "button";
  editButton.addEventListener("click", () => {
    state.editingId = task.id;
    renderTaskList();
  });

  const toggleButton = createElement(
    "button",
    `toggle-btn${task.completed ? " completed" : ""}`,
    task.completed ? "Возобновить" : "Завершить"
  );
  toggleButton.type = "button";
  toggleButton.addEventListener("click", () => {
    toggleTask(task.id);
    renderTaskList();
  });

  const deleteButton = createElement("button", "delete-btn", "Удалить");
  deleteButton.type = "button";
  deleteButton.addEventListener("click", () => {
    removeTask(task.id);
    renderTaskList();
  });

  [editButton, toggleButton, deleteButton].forEach((button) => {
    button.draggable = false;
  });

  actions.append(editButton, toggleButton, deleteButton);
  item.append(content, actions);
  addDragAndDrop(item, task.id);

  return item;
}

function updateStats(tasks) {
  const { total, completed } = getStats(tasks);
  elements.tasksCount.textContent = `Заданий: ${total}`;
  elements.completedCount.textContent = `Завершено: ${completed}`;
}

function renderTaskList() {
  const allTasks = getTasks();
  const visibleTasks = sortTasks(
    filterTasks(allTasks, state.filter, state.search),
    state.sort,
    state.sortDirection
  );

  elements.taskList.replaceChildren();
  updateStats(allTasks);

  if (visibleTasks.length === 0) {
    elements.taskList.appendChild(
      createElement("li", "empty-state", getEmptyMessage(allTasks.length))
    );
    return;
  }

  visibleTasks.forEach((task) => {
    elements.taskList.appendChild(createTaskItem(task));
  });
}

function init() {
  buildLayout();
  setupEventListeners();
  setupHeaderActions(reset);
  renderTaskList();
}

init();
