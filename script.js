const taskField = document.getElementById("taskField");
const createBtn = document.getElementById("createBtn");
const listContainer = document.getElementById("listContainer");

// Fetch saved tasks
let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

// Initial load
loadTasks();

// Add task
createBtn.addEventListener("click", () => {
  const text = taskField.value.trim();

  if (!text) {
    alert("Please enter a task.");
    return;
  }

  const newTask = {
    id: Date.now(),
    task: text,
    done: false,
  };

  todoList.push(newTask);
  saveTasks();
  loadTasks();

  taskField.value = "";
});

// Render tasks
function loadTasks() {
  listContainer.innerHTML = "";

  todoList.forEach((item) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="task-section">
        <input type="checkbox" ${
          item.done ? "checked" : ""
        } onchange="toggleTask(${item.id})">
        <span class="${item.done ? "completed" : ""}">${item.task}</span>
      </div>

      <div class="action-btns">
        <button class="edit" onclick="modifyTask(${item.id})">Edit</button>
        <button class="delete" onclick="removeTask(${item.id})">Delete</button>
      </div>
    `;

    listContainer.appendChild(li);
  });
}

// Toggle complete
function toggleTask(id) {
  todoList = todoList.map((t) => (t.id === id ? { ...t, done: !t.done } : t));

  saveTasks();
  loadTasks();
}

// Edit task
function modifyTask(id) {
  const updatedText = prompt("Update your task:");

  if (updatedText === null || updatedText.trim() === "") {
    alert("Task cannot be empty.");
    return;
  }

  todoList = todoList.map((t) =>
    t.id === id ? { ...t, task: updatedText } : t
  );

  saveTasks();
  loadTasks();
}

// Delete task
function removeTask(id) {
  todoList = todoList.filter((t) => t.id !== id);
  saveTasks();
  loadTasks();
}

// Local storage save
function saveTasks() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}
