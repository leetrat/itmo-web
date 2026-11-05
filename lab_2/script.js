document.addEventListener("DOMContentLoaded", () => {
  init();

});

function init() {
  const container = document.createElement("div");
  container.className = "container";

  const header = document.createElement("h1");
  header.textContent = "Список дел";
  container.appendChild(header);

  renderControls(container);
  rednerFilterCtl(container);
  renderSearch(container);
  rednerTasklist(container);

  document.body.appendChild(container);
}


function renderControls(container) {
  const controls = document.createElement("div");
  controls.className = "controls";

  const taskInput = document.createElement("input");
  taskInput.type = "text";
  taskInput.id = "taskInput";
  taskInput.placeholder = "Введите новое задание...";
  controls.appendChild(taskInput);

  const addTaskBtn = document.createElement("button");
  addTaskBtn.id = "addTaskBtn";
  addTaskBtn.textContent = "Добавить";
  controls.appendChild(addTaskBtn);

  container.appendChild(controls);
}

function rednerFilterCtl(container) {
  const filterControls = document.createElement("div");
  filterControls.className = "filter-controls";

  const allTasksBtn = document.createElement("button");
  allTasksBtn.id = "allTasksBtn";
  allTasksBtn.className = "active";
  allTasksBtn.textContent = "Все";
  filterControls.appendChild(allTasksBtn);

  const activeTasksBtn = document.createElement("button");
  activeTasksBtn.id = "activeTasksBtn";
  activeTasksBtn.textContent = "Активные";
  filterControls.appendChild(activeTasksBtn);

  const completedTasksBtn = document.createElement("button");
  completedTasksBtn.id = "completedTasksBtn";
  completedTasksBtn.textContent = "Завершенные";
  filterControls.appendChild(completedTasksBtn);

  container.appendChild(filterControls);
}

function renderSearch(container) {
  const searchSort = document.createElement("div");
  searchSort.className = "search-sort";

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.id = "searchInput";
  searchInput.placeholder = "Поиск...";
  searchSort.appendChild(searchInput);

  const sortTextBtn = document.createElement("button");
  sortTextBtn.id = "sortTextBtn";
  sortTextBtn.textContent = "Сортировка по тексту";
  searchSort.appendChild(sortTextBtn);

  const sortByDateBtn = document.createElement("button");
  sortByDateBtn.id = "sortByDateBtn";
  sortByDateBtn.textContent = "Сортировка по дате";
  searchSort.appendChild(sortByDateBtn);

  container.appendChild(searchSort);
}

function rednerTasklist(container) {
  const taskList = document.createElement("ul");
  taskList.id = "taskList";
  taskList.className = "task-list";
  container.appendChild(taskList);

  const stats = document.createElement("div");
  stats.className = "stats";

  const tasksCount = document.createElement("span");
  tasksCount.id = "tasksCount";
  tasksCount.textContent = "Заданий: 0";
  stats.appendChild(tasksCount);

  const completedCount = document.createElement("span");
  completedCount.id = "completedCount";
  completedCount.textContent = "Завершено: 0";
  stats.appendChild(completedCount);

  container.appendChild(stats);
}
