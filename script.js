const API_URL = 'http://localhost:3000/tasks';
const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');
const emptyMsg = document.getElementById('empty-msg');

async function loadTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    renderTasks(tasks);
}

function renderTasks(tasks) {
    taskList.innerHTML = '';
    
    if (tasks.length === 0) {
        emptyMsg.style.display = 'block';
    } else {
        emptyMsg.style.display = 'none';
        tasks.forEach(task => {
            const div = document.createElement('div');
            div.className = 'task-item';
            div.innerHTML = `
                <span>${task.title}</span>
                <button onclick="deleteTask(${task.id})">Eliminar</button>
            `;
            taskList.appendChild(div);
        });
    }
}

async function addTask() {
    const title = taskInput.value;
    if (!title) return alert("Escribe algo");

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, completed: false })
    });

    taskInput.value = '';
    loadTasks(); 
}

async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    loadTasks(); 
}

loadTasks();