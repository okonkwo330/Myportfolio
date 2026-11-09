/* ========= ACADEMIC PLANNER ========= */

// This ARRAY stores every task as an object: { name, priority, done }
alert('Planner.js loaded');

// ---- State ----
let tasks = JSON.parse(localStorage.getItem('cos106-tasks')) || [];

const form     = document.getElementById('task-form');
const input    = document.getElementById('task-input');
const priority = document.getElementById('task-priority');
const list     = document.getElementById('task-list');
const emptyMsg = document.getElementById('empty-msg');
const countEl  = document.getElementById('task-count');

// ---- Helpers ----
function save() {
  localStorage.setItem('cos106-tasks', JSON.stringify(tasks));
}

function render() {
  list.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.completed ? ' completed' : '');

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTask(index));

    // Text
    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = task.text;

    // Priority badge
    const badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = task.priority;

    // Delete button
    const del = document.createElement('button');
    del.className = 'btn btn-danger';
    del.textContent = 'Delete';
    del.addEventListener('click', () => deleteTask(index));

    li.append(checkbox, span, badge, del);
    list.appendChild(li);
  });

  // Dynamic counters
  const done = tasks.filter(t => t.completed).length;
  countEl.textContent = tasks.length
    ? `${done} of ${tasks.length} tasks completed`
    : '';
  emptyMsg.style.display = tasks.length ? 'none' : 'block';
}

// ---- Actions ----
function addTask(text, prio) {
  tasks.push({ text: text.trim(), priority: prio, completed: false });
  save();
  render();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  save();
  render();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  save();
  render();
}

// ---- Events ----
form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addTask(text, priority.value);
  input.value = '';
  input.focus();
});

// Initial render
render();