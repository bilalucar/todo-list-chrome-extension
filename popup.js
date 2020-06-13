const TODO_LIST_KEY = 'todo_list_app';

const taskInput = document.getElementById('new-task');

const addTaskButton = document.getElementById('add-task');

const tasks = document.getElementById('tasks');

const taskList = [];

window.onload = () => getStorageData();

const createTaskElement = (taskString, id) => {
    const listItem = document.createElement('li');

    listItem.id = `item-${id}`;

    const text = document.createElement('p');

    text.innerText = taskString;

    const deleteButton = document.createElement('button');

    deleteButton.innerText = 'Delete';
    deleteButton.id = id;
    deleteButton.onclick = deleteTask;

    listItem.appendChild(text);
    listItem.appendChild(deleteButton);

    return listItem;
};

const addTask = () => {
    const listItem = createTaskElement(taskInput.value, taskList.length);

    tasks.appendChild(listItem);

    taskList.push(taskInput.value);

    setTaskStorage();

    taskInput.value = '';
}

const deleteTask = (event) => {
    taskList.splice(+event.target.id, 1);

    setTaskStorage();

    document.getElementById(`item-${event.target.id}`).remove();
}

const getStorageData = () => {
    chrome.storage.sync.get([TODO_LIST_KEY], (result) => {
        if (result[TODO_LIST_KEY]) {
            result[TODO_LIST_KEY].forEach((item, index) => {
                taskList.push(item);
                tasks.appendChild(createTaskElement(item, index));
            });
        }
    });
};

const setTaskStorage = () => chrome.storage.sync.set({[TODO_LIST_KEY]: taskList});

addTaskButton.onclick = addTask;
