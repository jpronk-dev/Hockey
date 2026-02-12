// Taken
let tasks = [];
let showCompleted = false;

// Check of gebruiker admin is
function isAdminUser() {
    return !!sessionStorage.getItem('adminPin');
}

// Data opslaan via API
async function saveTasks() {
    await saveData('tasks', tasks);
}

// Taak toevoegen
async function addTask() {
    if (!isAdminUser()) return;

    const input = document.getElementById('taskInput');
    const text = input.value.trim();

    if (!text) return;

    tasks.unshift({
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    });

    await saveTasks();
    input.value = '';
    render();
}

// Taak voltooien/ongedaan maken
async function toggleTask(id) {
    if (!isAdminUser()) return;

    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        task.completedAt = task.completed ? new Date().toISOString() : null;
        await saveTasks();
        render();
    }
}

// Taak verwijderen
async function deleteTask(id) {
    if (!isAdminUser()) return;

    tasks = tasks.filter(t => t.id !== id);
    await saveTasks();
    render();
}

// Voltooide taken tonen/verbergen
function toggleCompleted() {
    showCompleted = !showCompleted;
    document.getElementById('arrow').classList.toggle('open', showCompleted);
    document.getElementById('completedList').classList.toggle('show', showCompleted);
}

// Renderen
function render() {
    const admin = isAdminUser();
    const activeTasks = tasks.filter(t => !t.completed);
    const completedTasks = tasks.filter(t => t.completed);

    // Toon/verberg invoerveld op basis van admin
    const addTaskEl = document.getElementById('addTask');
    if (addTaskEl) addTaskEl.style.display = admin ? '' : 'none';

    // Actieve taken
    const taskList = document.getElementById('taskList');
    if (activeTasks.length === 0) {
        taskList.innerHTML = '<div class="empty">Geen taken.</div>';
    } else {
        taskList.innerHTML = activeTasks.map(task => {
            const deleteBtn = admin ? `<button class="task-delete" onclick="deleteTask(${task.id})">×</button>` : '';
            const checkboxClick = admin ? `onclick="toggleTask(${task.id})"` : '';
            return `
                <div class="task-item">
                    <div class="task-checkbox" ${checkboxClick}></div>
                    <div class="task-text">${escapeHtml(task.text)}</div>
                    ${deleteBtn}
                </div>
            `;
        }).join('');
    }

    // Voltooide taken
    const completedList = document.getElementById('completedList');
    document.getElementById('completedCount').textContent = completedTasks.length;

    if (completedTasks.length === 0) {
        completedList.innerHTML = '';
    } else {
        completedList.innerHTML = completedTasks.map(task => {
            const deleteBtn = admin ? `<button class="task-delete" onclick="deleteTask(${task.id})">×</button>` : '';
            const checkboxClick = admin ? `onclick="toggleTask(${task.id})"` : '';
            return `
                <div class="task-item completed">
                    <div class="task-checkbox checked" ${checkboxClick}></div>
                    <div class="task-text">${escapeHtml(task.text)}</div>
                    ${deleteBtn}
                </div>
            `;
        }).join('');
    }
}

// HTML escapen voor veiligheid
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Enter toets voor input
document.getElementById('taskInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Init: haal data op van API
async function initTodo() {
    const storedTasks = await fetchData('tasks');
    if (storedTasks && Array.isArray(storedTasks)) {
        tasks = storedTasks;
    }
    render();
}

initTodo();
