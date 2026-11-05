
const tasks = [
  {
    id: 1,
    title: "Read the project brief",
    completed: false,
    priority: "high",
    createdAt: "2026-11-02"
  },
  {
    id: 2,
    title: "Practice JavaScript",
    completed: false,
    priority: "medium",
    createdAt: "2026-11-02"
  },
  {
    id: 3,
    title: "Complete assignment",
    completed: true,
    priority: "high",
    createdAt: "2026-11-02"
  },
  {
    id: 4,
    title: "Review my notes",
    completed: false,
    priority: "low",
    createdAt: "2026-11-02"
  },
  {
    id: 5,
    title: "Test my code",
    completed: false,
    priority: "medium",
    createdAt: "2026-11-02"
  }
];

console.log(tasks);
console.log("Number of tasks:", tasks.length);
console.log("First task title:", tasks[0].title);
tasks[0].completed = true;
console.log("First task completed:", tasks[0].completed);
const newTask = {
  id: 6,
  title: "Learn JavaScript functions",
  completed: false,
  priority: "high",
  createdAt: "2026-11-02"
};
console.log("Updated number of tasks:", tasks.length);
function addTask(tasks, newTask) {
  return [...tasks, newTask];
}
const updatedTasks = addTask(tasks, newTask);

console.log("Original task count:", tasks.length);
console.log("Updated task count:", updatedTasks.length);
function completeTask(tasks, taskId) {
  return tasks.map(task =>
    task.id === taskId
      ? { ...task, completed: true }
      : task
  );
}
const completedTasks = completeTask(tasks, 2);

console.log(
  "Original task 2:",
  tasks[1].completed
);

console.log(
  "Updated task 2:",
  completedTasks[1].completed
);
function deleteTask(tasks, taskId) {
  return tasks.filter(task => task.id !== taskId);
}
const remainingTasks = deleteTask(tasks, 3);

console.log("Original task count:", tasks.length);
console.log("Remaining task count:", remainingTasks.length);
console.log("Original task 3:", tasks[2].title);
function renameTask(tasks, taskId, newTitle) {
 if (!newTitle.trim()) return tasks; return tasks.map(task =>
    task.id === taskId
      ? { ...task, title: newTitle }
      : task
  );
}
const renamedTasks = renameTask(
  tasks,
  2,
  "Practice JavaScript every day"
);

function toggleTask(tasks, taskId) {
  return tasks.map(task =>
    task.id === taskId
      ? { ...task, completed: !task.completed }
      : task
  );
}
const toggledTasks = toggleTask(tasks, 2);

console.log("Original completed:", tasks[1].completed);
console.log("Toggled completed:", toggledTasks[1].completed);

console.log("Original title:", tasks[1].title);
console.log("New title:", renamedTasks[1].title);
const missingTask = completeTask(tasks, 99);

console.log("Missing ID test:", missingTask.length === tasks.length);
const blankTitleTest = renameTask(tasks, 2, "   ");

console.log(
  "Blank title rejected:",
  blankTitleTest[1].title === tasks[1].title
);
const openTasks = tasks.filter(task => task.completed === false);

console.log("Open tasks:", openTasks);
const openTaskTitles = openTasks.map(task => task.title);

console.log("Open task titles:", openTaskTitles);
const foundTask = tasks.find(task => task.id === 3);

console.log("Found task:", foundTask.title);
const hasHighPriorityTask = tasks.some(
  task => task.priority === "high"
);

console.log("Has high priority task:", hasHighPriorityTask);
const allTasksCompleted = tasks.every(
  task => task.completed === true
);

console.log("Are all tasks completed?", allTasksCompleted);
const completedCount = tasks.reduce(
  (count, task) => {
    return task.completed ? count + 1 : count;
  },
  0
);

console.log("Completed tasks:", completedCount);
const completedByPriority = tasks.reduce((counts, task) => {
  if (task.completed) {
    counts[task.priority] = (counts[task.priority] || 0) + 1;
  }
  return counts;
}, {});

console.log("Completed by priority:", completedByPriority);
const unfinishedTitlesChained = tasks
  .filter(task => task.completed === false)
  .map(task => task.title);

console.log("Unfinished titles (chained):", unfinishedTitlesChained);
const unfinishedTasks = tasks.filter(
  task => task.completed === false
);

const unfinishedTitles = unfinishedTasks.map(
  task => task.title
);

console.log("Unfinished titles (separate steps):", unfinishedTitles);
const purchases = [
  { item: "Notebook", price: 200 },
  { item: "Pen", price: 50 },
  { item: "Bag", price: 1500 },
  { item: "Books", price: 1500 }
];
function getPurchaseSummary(purchases) {
  if (purchases.length === 0) {
  return {
    total: 0,
    count: 0,
    average: 0,
    mostExpensive: null
  };
}
  const total = purchases.reduce(
    (sum, purchase) => sum + purchase.price,
    0
  );

  const count = purchases.length;
  const average = count === 0 ? 0 : total / count;

  const mostExpensive = purchases.reduce((highest, purchase) =>
    purchase.price > highest.price ? purchase : highest
  );

  return {
    total,
    count,
    average,
    mostExpensive
  };
} 
const summary = getPurchaseSummary(purchases);
console.log("Purchase summary:", summary);
const emptySummary = getPurchaseSummary([]);
console.log("Empty purchase summary:", emptySummary);
const onePurchase = getPurchaseSummary([
  { item: "Ruler", price: 100 }
]);

console.log("One purchase summary:", onePurchase);
class Task {
  #completed = false;
  constructor(id, title, priority) {
    this.id = id;
    this.title = title;
    this.priority = priority;
    this.#completed = false;
  }

complete() {
    this.#completed = true;
  }
  toggle() {
  this.#completed = !this.#completed;
}
  get completed() {
  return this.#completed;
}

  rename(newTitle) {
  if (newTitle.trim() === "") {
    console.log("Task title cannot be empty");
    return;
  }

  this.title = newTitle;
}
  describe() {
    return `${this.title} - ${this.priority} - ${this.completed}`;
  }
}
const myTask = new Task(7, "Learn OOP", "high");

console.log("My task:", myTask);
console.log("Task description:", myTask.describe());
myTask.complete();
console.log("After completing:", myTask.completed);

myTask.rename("Practice OOP in JavaScript");
console.log("After renaming:", myTask.title);
myTask.rename("   ");
console.log("Task title after blank rename:", myTask.title);
console.log("Before toggle:", myTask.completed);

myTask.toggle();
console.log("After first toggle:", myTask.completed);

myTask.toggle();
console.log("After second toggle:", myTask.completed);
class TaskList {
  #tasks = [];

  add(task) {
    this.#tasks.push(task);
  }

  remove(id) {
    this.#tasks = this.#tasks.filter(task => task.id !== id);
  }

  findById(id) {
    return this.#tasks.find(task => task.id === id);
  }

  getOpenTasks() {
    return this.#tasks.filter(task => !task.completed);
  }
}
const myTaskList = new TaskList();

const taskOne = new Task(8, "Study JavaScript", "high");
const taskTwo = new Task(9, "Practice OOP", "medium");

myTaskList.add(taskOne);
myTaskList.add(taskTwo);

console.log("Found task:", myTaskList.findById(8));
console.log("Open tasks:", myTaskList.getOpenTasks());
myTaskList.remove(8);

console.log("After removing task 8:", myTaskList.getOpenTasks());
class Reminder extends Task {
  constructor(id, title, priority, dueDate) {
    super(id, title, priority);
    this.dueDate = dueDate;
  }

  describe() {
    return `${this.title} - ${this.priority} - Due: ${this.dueDate}`;
  }
}
const urgentTask = new Reminder(
  10,
  "Submit JavaScript assignment",
  "high",
  "2026-11-05"
);

console.log("Reminder task:", urgentTask);
console.log("Reminder description:", urgentTask.describe());
console.log("Reminder completed:", urgentTask.completed);
const taskWithReminder = new Task(
  11,
  "Prepare presentation",
  "high"
);

taskWithReminder.reminder = {
  dueDate: "2026-11-05",
  message: "Submit before the deadline"
};

console.log("Task reminder:", taskWithReminder.reminder);
class TaskRepository {
  #tasks = [];

  add(task) {
  const existingTask = this.#tasks.find(
    existing => existing.id === task.id
  );

  if (existingTask) {
    console.log("Task ID already exists");
    return;
  }

  this.#tasks.push(task);
}

  findById(id) {
    return this.#tasks.find(task => task.id === id);
  }

  remove(id) {
    this.#tasks = this.#tasks.filter(task => task.id !== id);
  }

  getAll() {
    return [...this.#tasks];
  }
}
const repository = new TaskRepository();

const savedTask = new Task(
  12,
  "Test TaskRepository",
  "high"
);

repository.add(savedTask);

console.log("All saved tasks:", repository.getAll());
console.log("Find task 12:", repository.findById(12));
repository.remove(12);

console.log("After removing task 12:", repository.getAll());
console.log("Unknown task:", repository.findById(99));
const emptyRepository = new TaskRepository();

console.log("Empty repository:", emptyRepository.getAll());
const singleRepository = new TaskRepository();

const oneTask = new Task(
  13,
  "Complete one-task test",
  "medium"
);

singleRepository.add(oneTask);

console.log("Single task repository:", singleRepository.getAll());
const duplicateTask = new Task(
  13,
  "Duplicate ID test",
  "high"
);

singleRepository.add(duplicateTask);

console.log("Duplicate ID test:", singleRepository.getAll());
function getTaskStats(tasks) {
  const total = tasks.length;

  const completed = tasks.filter(
    task => task.completed === true
  ).length;

  const open = tasks.filter(
    task => task.completed === false
  ).length;

  const completionRate = total === 0
    ? 0
    : (completed / total) * 100;

  const priorityCounts = tasks.reduce((counts, task) => {
    counts[task.priority] = (counts[task.priority] || 0) + 1;
    return counts;
  }, {});

  return {
    total,
    completed,
    open,
    completionRate,
    priorityCounts
  };
}
const taskStatistics = getTaskStats(tasks);

console.log("Task Statistics:", taskStatistics);
console.log("Empty task statistics:", getTaskStats([]));
