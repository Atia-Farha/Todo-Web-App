const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const deleteCheckedBtn = document.getElementById('deleteCheckedBtn');
const taskList = document.getElementById('taskList');
const emptyTaskList = document.getElementById('empty-tasklist');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
renderTasks();

addBtn.addEventListener('click', () => {
    const task = taskInput.value.trim();

    if (task !== '') {
        const newTask = {
            text: task,
            completed: false
        };
        tasks.push(newTask);

        saveTasks();
        renderTasks();

        taskInput.value = '';
    }
    else if (task.length > 50) {
        alert('Task cannot be longer than 50 characters.');
    }
    else {
        alert('Please add a task.');
    }
});

function deleteTask(index) {
    tasks.splice(index, 1);

    saveTasks();
    renderTasks();
};

deleteCheckedBtn.addEventListener('click', () => {
    tasks = tasks.filter((task) => !task.completed);

    saveTasks();
    renderTasks();
});

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = '';

    if (tasks.length > 0) {
        tasks.forEach((task, index) => {
            emptyTaskList.classList.add('d-none');

            const li = document.createElement('li');
            li.className = `taskItem list-group-item d-flex justify-content-between align-items-center border-primary-subtle ${task.completed ? 'bg-primary-subtle' : ''}`;

            li.innerHTML = `
            <input type="checkbox" data-index="${index}" id="task-${index}" class="form-check-input mx-3 border-primary" ${task.completed ? 'checked' : ''}>
            <label for="task-${index}" class="form-check-label flex-grow-1 ${task.completed ? 'text-decoration-line-through text-muted' : ''}">${task.text}</label>
            <button onclick="deleteTask(${index})" class="btn text-danger">✘</button>
        `;

            taskList.appendChild(li);
        });
    }
    else {
        emptyTaskList.classList.remove('d-none');
    }
}

taskList.addEventListener('change', (event) => {
    if (event.target && event.target.matches('input[type="checkbox"]')) {
        const index = event.target.getAttribute('data-index');
        tasks[index].completed = event.target.checked;
        saveTasks();
        renderTasks();
    }
});

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))