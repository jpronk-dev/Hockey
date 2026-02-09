// Taken ophalen uit localStorage
let tasks = JSON.parse(localStorage.getItem('hockeyTasks')) || [];
let showCompleted = false;

// Data opslaan
function saveData() {
    localStorage.setItem('hockeyTasks', JSON.stringify(tasks));
}

// Taak toevoegen
function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();

    if (!text) return;

    tasks.unshift({
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    });

    saveData();
    input.value = '';
    render();
}

// Taak voltooien/ongedaan maken
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        task.completedAt = task.completed ? new Date().toISOString() : null;
        saveData();
        render();
    }
}

// Taak verwijderen
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveData();
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
    const activeTasks = tasks.filter(t => !t.completed);
    const completedTasks = tasks.filter(t => t.completed);

    // Actieve taken
    const taskList = document.getElementById('taskList');
    if (activeTasks.length === 0) {
        taskList.innerHTML = '<div class="empty">Geen taken. Voeg er een toe!</div>';
    } else {
        taskList.innerHTML = activeTasks.map(task => `
            <div class="task-item">
                <div class="task-checkbox" onclick="toggleTask(${task.id})"></div>
                <div class="task-text">${escapeHtml(task.text)}</div>
                <button class="task-delete" onclick="deleteTask(${task.id})">×</button>
            </div>
        `).join('');
    }

    // Voltooide taken
    const completedList = document.getElementById('completedList');
    document.getElementById('completedCount').textContent = completedTasks.length;

    if (completedTasks.length === 0) {
        completedList.innerHTML = '';
    } else {
        completedList.innerHTML = completedTasks.map(task => `
            <div class="task-item completed">
                <div class="task-checkbox checked" onclick="toggleTask(${task.id})"></div>
                <div class="task-text">${escapeHtml(task.text)}</div>
                <button class="task-delete" onclick="deleteTask(${task.id})">×</button>
            </div>
        `).join('');
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

// Start
render();
