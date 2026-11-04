 const task = {
  id: 1,
  title: "Read the project brief",
  completed: false,
  priority: "high",
  createdAt: "2026-10-29"
};

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
console.log(tasks[1].title);
tasks[0].completed = true;

console.log(tasks[0].completed);
