class Task {
  #completed = false;

  constructor(id, title, priority = "medium") {
    if (!title.trim()) {
      throw new Error("Task title is required");
    }

    this.id = id;
    this.title = title.trim();
    this.priority = priority;
  }

  get completed() {
    return this.#completed;
  }

  toggle() {
    this.#completed = !this.#completed;
  }

  rename(newTitle) {
    if (!newTitle.trim()) {
      throw new Error("Task title cannot be blank");
    }

    this.title = newTitle.trim();
  }

  describe() {
    return `${this.title} (${this.priority})`;
  }
}

const STORAGE_KEY = "focusBoardTasksV1";

let tasks = [];
let searchQuery = "";
let currentFilter = "all";
let lastDeletedTask = null;
let suggestionController = null;
let requestNumber = 0;

const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const priorityInput = document.querySelector("#priority-input");
const taskMessage = document.querySelector("#task-message");
const taskList = document.querySelector("#task-list");
const searchInput = document.querySelector("#search-input");
const statusFilter = document.querySelector("#status-filter");
const taskCount = document.querySelector("#task-count");
const completionRate = document.querySelector("#completion-rate");
const suggestionButton = document.querySelector("#load-suggestions");
const suggestionStatus = document.querySelector("#suggestion-status");
const suggestionList = document.querySelector("#suggestion-list");
const undoButton = document.querySelector("#undo-delete");
const exportButton = document.querySelector("#export-tasks");
const importInput = document.querySelector("#import-file");

function saveTasks() {
  try {
localStorage.setItem(
  STORAGE_KEY,
  JSON.stringify(tasks.map(task => ({
    id: task.id,
    title: task.title,
    priority: task.priority,
    completed: task.completed
  })))
);
    return true;
  } catch (error) {
    taskMessage.textContent = "Could not save tasks.";
    return false;
  }
}

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return;

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      throw new Error("Invalid task data");
    }

    tasks = parsed
      .filter(task =>
        task &&
        Number.isFinite(task.id) &&
        typeof task.title === "string" &&
        task.title.trim() !== "" &&
        typeof task.completed === "boolean" &&
        ["low", "medium", "high"].includes(task.priority)
      )
      .map(item => {
        const task = new Task(item.id, item.title, item.priority);

        if (item.completed) task.toggle();

        return task;
      });
  } catch (error) {
    tasks = [];
    taskMessage.textContent =
      "Saved data was damaged. Starting with an empty task list.";
  }
}

function normalizeSuggestions(data) {
  if (!Array.isArray(data)) {
    return [];
  }

  return data
    .filter(item =>
      item &&
      typeof item.title === "string" &&
      item.title.trim() !== ""
    )
    .slice(0, 5)
    .map((item, index) => ({
      id: item.id ?? index + 1,
      title: item.title.trim()
    }));
}
function getVisibleTasks(allTasks, query, status) {
  return allTasks.filter(task => {
    const matchesSearch =
      task.title.toLowerCase().includes(query.trim().toLowerCase());

    const matchesStatus =
      status === "all" ||
      (status === "open" && !task.completed) ||
      (status === "completed" && task.completed);

    return matchesSearch && matchesStatus;
  });
}
function renderTasks() {
  const visibleTasks = getVisibleTasks(
    tasks,
    searchQuery,
    currentFilter
  );

  taskList.innerHTML = "";

  if (visibleTasks.length === 0) {
    const message = document.createElement("li");
    message.textContent = "No tasks found.";
    taskList.appendChild(message);
  }

  visibleTasks.forEach(task => {
    const item = document.createElement("li");

    const title = document.createElement("span");
    title.textContent = task.title;

    if (task.completed) {
      title.textContent += " (Completed)";
    }
  const checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.checked = task.completed;
checkbox.setAttribute("aria-label", `Complete ${task.title}`);

checkbox.addEventListener("change", function() {
  task.toggle();
  saveTasks();
  renderTasks();
});

item.appendChild(checkbox);

    const priority = document.createElement("span");
    priority.textContent = ` — Priority: ${task.priority}`;

    item.appendChild(title);
    item.appendChild(priority);
    const editButton = document.createElement("button");
editButton.textContent = "Edit";

editButton.addEventListener("click", function() {
  const newTitle = prompt("Enter the new task title:", task.title);

  if (newTitle === null) return;

  if (!newTitle.trim()) {
    taskMessage.textContent = "Task title cannot be blank.";
    return;
  }

  if (tasks.some(otherTask =>
    otherTask.id !== task.id &&
    otherTask.title.toLowerCase() === newTitle.trim().toLowerCase()
  )) {
    taskMessage.textContent = "This task already exists.";
    return;
  }

  task.rename(newTitle);
  saveTasks();
  renderTasks();
  taskMessage.textContent = "Task updated successfully.";
});

const deleteButton = document.createElement("button");
deleteButton.textContent = "Delete";

deleteButton.addEventListener("click", function() {
  if (!confirm("Are you sure you want to delete this task?")) return;

  lastDeletedTask = {
    task: task,
    index: tasks.indexOf(task)
  };

  tasks = tasks.filter(item => item.id !== task.id);

  saveTasks();
  renderTasks();
  taskMessage.textContent = "Task deleted. You can undo this action.";
});

item.appendChild(editButton);
item.appendChild(deleteButton);
    taskList.appendChild(item);
  });

  const completedCount = tasks.filter(
    task => task.completed
  ).length;

  const percentage = tasks.length === 0
    ? 0
    : Math.round((completedCount / tasks.length) * 100);

  taskCount.textContent = `Total: ${tasks.length}`;
  completionRate.textContent = `Completed: ${percentage}%`;
}
taskForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const title = taskInput.value.trim();
  const priority = priorityInput.value;

  if (!title) {
    taskMessage.textContent = "Please enter a task title.";
    return;
  }

  if (tasks.some(task =>
    task.title.toLowerCase() === title.toLowerCase()
  )) {
    taskMessage.textContent = "This task already exists.";
    return;
  }

  const newTask = new Task(
    Date.now(),
    title,
    priority
  );

  tasks.push(newTask);
  saveTasks();
  renderTasks();

  taskInput.value = "";
  taskMessage.textContent = "Task added successfully.";
});
searchInput.addEventListener("input", function() {
  searchQuery = searchInput.value;
  renderTasks();
});

statusFilter.addEventListener("change", function() {
  currentFilter = statusFilter.value;
  renderTasks();
});
undoButton.addEventListener("click", function() {
  if (!lastDeletedTask) {
    taskMessage.textContent = "There is no task to restore.";
    return;
  }

  tasks.splice(
    lastDeletedTask.index,
    0,
    lastDeletedTask.task
  );

  lastDeletedTask = null;

  saveTasks();
  renderTasks();

  taskMessage.textContent = "Task restored successfully.";
});

exportButton.addEventListener("click", function() {
  const taskData = tasks.map(task => ({
    id: task.id,
    title: task.title,
    priority: task.priority,
    completed: task.completed
  }));

  const jsonData = JSON.stringify(taskData, null, 2);

  const blob = new Blob([jsonData], {
    type: "application/json"
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "focus-board-tasks.json";
  link.click();

  URL.revokeObjectURL(url);

  taskMessage.textContent = "Tasks exported successfully.";
});
  exportButton.addEventListener("click", function() {
  const taskData = tasks.map(task => ({
    id: task.id,
    title: task.title,
    priority: task.priority,
    completed: task.completed
  }));

  const jsonData = JSON.stringify(taskData, null, 2);

  const blob = new Blob([jsonData], {
    type: "application/json"
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "focus-board-tasks.json";
  link.click();

  URL.revokeObjectURL(url);

  taskMessage.textContent = "Tasks exported successfully.";
});
importInput.addEventListener("change", async function() {
  const file = importInput.files[0];

  if (!file) return;

  try {
    const text = await file.text();
    const importedData = JSON.parse(text);

    if (!Array.isArray(importedData)) {
      throw new Error("The file must contain a task array.");
    }

    const validTasks = importedData.every(task =>
      task &&
      Number.isFinite(task.id) &&
      typeof task.title === "string" &&
      task.title.trim() !== "" &&
      typeof task.completed === "boolean" &&
      ["low", "medium", "high"].includes(task.priority)
    );

    if (!validTasks) {
      throw new Error("The file contains invalid tasks.");
    }

    const importedTasks = importedData.map(item => {
      const task = new Task(item.id, item.title, item.priority);

      if (item.completed) task.toggle();

      return task;
    });

    if (!confirm("Importing will replace your current tasks. Continue?")) {
      return;
    }

    const previousTasks = tasks;
    tasks = importedTasks;

    if (!saveTasks()) {
      tasks = previousTasks;
      throw new Error("Could not save imported tasks.");
    }

    lastDeletedTask = null;
    renderTasks();
    taskMessage.textContent = "Tasks imported successfully.";

  } catch (error) {
    taskMessage.textContent = "Import failed: " + error.message;
  }

  importInput.value = "";
});
suggestionButton.addEventListener("click", loadSuggestions);

async function loadSuggestions() {
  suggestionButton.disabled = true;
  suggestionStatus.textContent = "Loading suggestions...";
  suggestionList.innerHTML = "";

  const currentRequest = ++requestNumber;

  if (suggestionController) {
    suggestionController.abort();
  }

  suggestionController = new AbortController();

  try {
    const [todosResponse, postsResponse] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/todos?_limit=5", {
        signal: suggestionController.signal
      }),
      fetch("https://jsonplaceholder.typicode.com/posts?_limit=5", {
        signal: suggestionController.signal
      })
    ]);

    if (!todosResponse.ok || !postsResponse.ok) {
      throw new Error("Could not load suggestions.");
    }

    const [todosData, postsData] = await Promise.all([
      todosResponse.json(),
      postsResponse.json()
    ]);

    const suggestions = normalizeSuggestions([
      ...todosData,
      ...postsData
    ]);

    if (currentRequest !== requestNumber) return;

    if (suggestions.length === 0) {
      throw new Error("No valid suggestions were found.");
    }

    suggestions.forEach(suggestion => {
      const item = document.createElement("li");
      const button = document.createElement("button");

      button.textContent = suggestion.title;

      button.addEventListener("click", function() {
        taskInput.value = suggestion.title;
        taskInput.focus();
      });

      item.appendChild(button);
      suggestionList.appendChild(item);
    });

    suggestionStatus.textContent = "Suggestions loaded successfully.";

  } catch (error) {
    if (error.name === "AbortError") return;

    suggestionStatus.textContent =
      "Could not load suggestions. Check your internet and try again.";

  } finally {
    if (currentRequest === requestNumber) {
      suggestionButton.disabled = false;
      suggestionController = null;
    }
  }
}