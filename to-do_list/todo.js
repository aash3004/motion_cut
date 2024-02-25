document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
                <div>
                    <button class="editBtn">Edit</button>
                    <button class="deleteBtn">Delete</button>
                </div>
            `;
            li.querySelector('.deleteBtn').addEventListener('click', () => deleteTask(index));
            li.querySelector('.editBtn').addEventListener('click', () => editTask(index));
            li.querySelector('input').addEventListener('change', () => toggleTask(index));
            taskList.appendChild(li);
        });
        saveTasks();
    }

    function addTask() {
        const text = taskInput.value.trim();
        if (text !== '') {
            tasks.push({ text, completed: false });
            renderTasks();
            taskInput.value = '';
        }
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }

    function editTask(index) {
        const newText = prompt('Enter new task:', tasks[index].text);
        if (newText !== null) {
            tasks[index].text = newText.trim();
            renderTasks();
        }
    }

    function toggleTask(index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    }

    addTaskBtn.addEventListener('click', addTask);

    renderTasks();
});
