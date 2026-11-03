const tasks = [
  {
    id: 1,
    title: "Read the project brief",
    completed: false,
    priority: "high",
    createdAt: "2026-10-29"
  },
  {
    id: 2,
    title: "Practice JavaScript",
    completed: false,
    priority: "medium",
    createdAt: "2026-10-29"
  },
  {
    id: 3,
    title: "Complete assignment",
    completed: true,
    priority: "high",
    createdAt: "2026-10-29"
  },
  {
    id: 4,
    title: "Review my notes",
    completed: false,
    priority: "low",
    createdAt: "2026-10-29"
  },
  {
    id: 5,
    title: "Test my code",
    completed: false,
    priority: "medium",
    createdAt: "2026-10-29"
  }
];

console.log("Number of tasks:", tasks.length);
console.log("Second task:", tasks[1].title);

// 2. Update a task
tasks[0].completed = true;
console.log("First task completed:", tasks[0].completed);

// 3. filter() - find unfinished tasks
const openTasks = tasks.filter(function(task) {
  return task.completed === false;
});

console.log(
  "Unfinished task titles:",
  openTasks.map(function(task) {
    return task.title;
  })
);

// 4. map() - get all task titles
const taskTitles = tasks.map(function(task) {
  return task.title;
});

console.log("All task titles:", taskTitles);

// 5. find() - find a task by ID
const foundTask = tasks.find(function(task) {
  return task.id === 3;
});

console.log("Found task:", foundTask.title);

// 6. some() - check whether any task has high priority
const hasHighPriorityTask = tasks.some(function(task) {
  return task.priority === "high";
});

console.log("Has high priority task:", hasHighPriorityTask);

// 7. every() - check whether all tasks are completed
const allTasksCompleted = tasks.every(function(task) {
  return task.completed === true;
});

console.log("Are all tasks completed?", allTasksCompleted);

// 8. reduce() - count completed tasks
const completedCount = tasks.reduce(function(count, task) {
  if (task.completed === true) {
    return count + 1;
  }

  return count;
}, 0);

console.log("Completed tasks:", completedCount);

// 9. reduce() - count tasks by priority
const priorityCounts = tasks.reduce(function(counts, task) {
  counts[task.priority] = (counts[task.priority] || 0) + 1;
  return counts;
}, {});

console.log("Tasks by priority:", priorityCounts);

// 10. Chain filter() and map()
const unfinishedTitles = tasks
  .filter(function(task) {
    return task.completed === false;
  })
  .map(function(task) {
    return task.title;
  });

console.log("Unfinished tasks:", unfinishedTitles);

// ========================================
// TASK FUNCTIONS
// ========================================

// 11. Validate task titles
function isValidTitle(title) {
  return typeof title === "string" && title.trim() !== "";
}

console.log("Valid title:", isValidTitle("Study JavaScript"));
console.log("Blank title:", isValidTitle("   "));

// 12. Add a task without changing the original array
function addTask(tasks, newTask) {
  const duplicate = tasks.some(function(task) {
    return task.id === newTask.id;
  });

  if (!isValidTitle(newTask.title) || duplicate) {
    return tasks;
  }

  return [...tasks, newTask];
}

const extraTask = {
  id: 6,
  title: "Learn JavaScript functions",
  completed: false,
  priority: "high",
  createdAt: "2026-10-29"
};

const updatedTasks = addTask(tasks, extraTask);

console.log("Original task count:", tasks.length);
console.log("Updated task count:", updatedTasks.length);
console.log("New task:", updatedTasks[5].title);

// 13. Complete a task without changing the original array
function completeTask(tasks, taskId) {
  return tasks.map(function(task) {
    if (task.id === taskId) {
      return { ...task, completed: true };
    }

    return task;
  });
}

const completedTasks = completeTask(tasks, 2);

console.log(
  "Task 2 completed:",
  completedTasks.find(function(task) {
    return task.id === 2;
  }).completed
);

console.log("Original task 2:", tasks[1].completed);

// 14. Delete a task without changing the original array
function deleteTask(tasks, taskId) {
  return tasks.filter(function(task) {
    return task.id !== taskId;
  });
}

const remainingTasks = deleteTask(tasks, 4);

console.log("Tasks before deletion:", tasks.length);
console.log("Tasks after deletion:", remainingTasks.length);

// 15. Rename a task without changing the original array
function renameTask(tasks, taskId, newTitle) {
  if (!isValidTitle(newTitle)) {
    return tasks;
  }

  return tasks.map(function(task) {
    if (task.id === taskId) {
      return { ...task, title: newTitle.trim() };
    }

    return task;
  });
}

const renamedTasks = renameTask(
  tasks,
  2,
  "Practise JavaScript daily"
);

console.log(
  "Renamed task:",
  renamedTasks.find(function(task) {
    return task.id === 2;
  }).title
);

console.log("Original title:", tasks[1].title);

// 16. Test that blank titles are rejected
const blankRename = renameTask(tasks, 2, "   ");

console.log(
  "Title after blank rename:",
  blankRename.find(function(task) {
    return task.id === 2;
  }).title
);

// ========================================
// TASK CLASS WITH PRIVATE FIELD
// ========================================

class Task {
  #completed = false;

  constructor(id, title, priority) {
    if (!isValidTitle(title)) {
      throw new Error("Title is required");
    }

    this.id = id;
    this.title = title.trim();
    this.priority = priority;
  }

  get completed() {
    return this.#completed;
  }

  complete() {
    this.#completed = true;
  }

  toggle() {
    this.#completed = !this.#completed;
  }

  rename(newTitle) {
    if (!isValidTitle(newTitle)) {
      return false;
    }

    this.title = newTitle.trim();
    return true;
  }

  describe() {
    return this.title + " - " + this.priority + " priority";
  }
}

// 17. Test the Task class
const myTask = new Task(7, "Learn classes", "high");

console.log("Class task title:", myTask.title);
console.log("Class task priority:", myTask.priority);
console.log("Initially completed:", myTask.completed);

myTask.complete();
console.log("After complete:", myTask.completed);

myTask.toggle();
console.log("After toggle:", myTask.completed);

myTask.rename("Practise Task classes");
console.log("New class task title:", myTask.title);

console.log("Description:", myTask.describe());

// 18. Test invalid titles
console.log("Rename with blank title:", myTask.rename("   "));
console.log("Title after invalid rename:", myTask.title);

// 19. Test constructor validation
try {
  const invalidTask = new Task(8, "   ", "low");
  console.log(invalidTask);
} catch (error) {
  console.log("Invalid task rejected:", error.message);
}
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
 const taskList = new TaskList();

const taskA = new Task(10, "Study arrays", "high");
const taskB = new Task(11, "Practise functions", "medium");

taskList.add(taskA);
taskList.add(taskB);

console.log("Found task:", taskList.findById(10).title);
console.log("Open tasks:", taskList.getOpenTasks().length);

taskA.complete();

console.log("Open tasks after completing one:", taskList.getOpenTasks().length);

taskList.remove(11);

console.log("Remaining open tasks:", taskList.getOpenTasks().length);   return this.#tasks.filter(task => !task.completed);
  }
}
// TEST THE TASKLIST CLASS

const taskList = new TaskList();

const taskA = new Task(10, "Study arrays", "high");
const taskB = new Task(11, "Practise functions", "medium");

taskList.add(taskA);
taskList.add(taskB);

console.log("Found task:", taskList.findById(10).title);
console.log("Open tasks:", taskList.getOpenTasks().length);

taskA.complete();

console.log(
  "Open tasks after completing one:",
  taskList.getOpenTasks().length
);

taskList.remove(11);

console.log(
  "Remaining open tasks:",
  taskList.getOpenTasks().length
);