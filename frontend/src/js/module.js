
const form = document.querySelector('.createTaskForm');
const url = 'http://localhost:3030/todos';
const buttonCheckAllTasks = document.querySelector('.selectAll');

const todos = [];

/**
 * 
 * @param {string} method 
 * @param {Object} body
 * @param {string=} path 
 */
function sendRequest(method, body, path) {
    const requestUrl = path ? `${url}/${path}` : url;
    const headers = {
        'Content-Type': 'application/json'
    };
    const options = {
        method: method,
        body: JSON.stringify(body)
    }
    if (method === 'POST' || method === 'PUT') {
        options.headers = headers;
    }
    return fetch(requestUrl, options);
}

/**
 * 
 * @param {{id: number; text: string; favorite: boolean; completed: boolean;}} todo 
 */
function getTodoTemplate(todo) {
    return `
        <div class="content ${todo.completed ? "completed" : ""}">
            <button class="checkbox ${todo.completed ? "selected" : ""}"></button>
            <input type="text" disabled value="${todo.text}" class="taskInput"/>
        </div>
        <div class="actions">
            <button class="star ${todo.favorite ? "selected" : ""}"></button>
            <button class="edit"></button>
            <button class="remove"></button>
        </div>
     `
}

/**
 * 
 * @param {{id: number; text: string; favorite: boolean; completed: boolean;}} todo 
 */
function renderTodo(todo) {
    const tasksDom = document.querySelector('.tasks');
    const taskDom = document.createElement('li');
    taskDom.dataset.id = todo.id;

    taskDom.innerHTML = getTodoTemplate(todo);
    tasksDom.append(taskDom);
    addRemoveHandler(taskDom);
    addCompleteHandler(taskDom);
    addFavoriteHandler(taskDom);
    editTaskButton(taskDom);
    onblurInput(taskDom);
}

/**
 * @param {string} text 
 */
function addTodo(text) {
    const newTodo = {
        text: text,
        completed: false,
        favorite: false
    }
    sendRequest('POST', newTodo)
    .then(data => data.json())
    .then((data) => {
        newTodo.id = data.id;
        todos.push(newTodo);
        renderTodo(newTodo)
        form.reset();
    })
}

form.onsubmit = function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const task = formData.get('task');
     
    if (task.trim()) {
        addTodo(task)
     } 
 }



 const getUpdatedTemplate = (task) => {
     return `
        <div class="content">
            <button class="checkbox"></button>
            <input type="text" disabled value="${task}" class="taskInput"/>
        </div>
        <div class="actions">
            <button class="star"></button>
            <button class="edit"></button>
            <button class="remove"></button>
        </div>
     `
 }
 const addRemoveHandler = (taskDom) => {
     const removeDom = taskDom.querySelector('.remove');
     removeDom.onclick = () => {
        const id = taskDom.dataset.id;
         fetch(`${url}/${id}`, {
             method: 'DELETE'
         }).then(() => {
            taskDom.remove();
         })
     }
 }

 const addCompleteHandler = (taskDom) => {
    const checkboxDom = taskDom.querySelector('.checkbox');
    checkboxDom.onclick = () => {
        const isCompleted = checkboxDom.classList.contains('selected');
        const id = taskDom.dataset.id;
        fetch(`${url}/${id}`, {
            method:'PUT',
            headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({
               completed: !isCompleted
           })
        }).then(() => {
            checkboxDom.classList.toggle('selected');
            taskDom.classList.toggle('completed');
        })
    }

 }
const addFavoriteHandler = (taskDom) =>{
    const starDom = taskDom.querySelector('.star');
    starDom.onclick = () => {
        const isFavorite = starDom.classList.contains('selected');
        const id = taskDom.dataset.id;
        fetch(`${url}/${id}`, {
            method:'PUT',
            headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({
                favorite: !isFavorite
           })
        }).then(() => {
            starDom.classList.toggle('selected');
        })
    
    }
}

const editTaskButton = (taskDom) => {
    const editButton = taskDom.querySelector('.edit');
    editButton.onclick = () => {
        const inputText = taskDom.querySelector('.taskInput');
        inputText.disabled = '';
    }
}
const onblurInput = (taskDom) => {
    const inputText = taskDom.querySelector('.taskInput');
    
    inputText.onblur = () => {
        const textValue = inputText.value;
        const id = taskDom.dataset.id;
        fetch(`${url}/${id}`,{
            method:'PUT',
            headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({
               text: textValue
           }) 
        }).then(() => {
            inputText.disabled = true;
        })
        
    }
}

const addTask = (task,completed,favorite, id) => {
    
    const tasksDom = document.querySelector('.tasks');
    const taskDom = document.createElement('li');

    taskDom.innerHTML = getUpdatedTemplate(task);
    if(completed) {
        const checkbox = taskDom.querySelector('.checkbox');
        checkbox.classList.add('selected');
        taskDom.classList.add('completed');
    }
    if(favorite) {
        const star = taskDom.querySelector('.star');
        star.classList.add('selected'); 
    }
    taskDom.dataset.id = id;
    tasksDom.append(taskDom);
    addRemoveHandler(taskDom);
    addCompleteHandler(taskDom);
    addFavoriteHandler(taskDom);
    editTaskButton(taskDom);
    onblurInput(taskDom);
}

buttonCheckAllTasks.onclick = () => {
    const tasksDom = document.querySelector('.tasks');
    const LisTask = tasksDom.querySelectorAll('li');
    const isCompletedTask = !buttonCheckAllTasks.classList.contains("selected");
    let ArrayIndexId = [];
    for(let i=0; i < LisTask.length; i++) {
        let IndexId = LisTask[i].dataset.id;
        ArrayIndexId.push(IndexId);
    }
    Promise.all([
        fetch(`${url}/${ArrayIndexId[0]}`,{
            method:'PUT',
        headers: {
           'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            completed: isCompletedTask
        })
        }),
        fetch(`${url}/${ArrayIndexId[1]}`,{
            method:'PUT',
        headers: {
           'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            completed: isCompletedTask
        })
        }),
        fetch(`${url}/${ArrayIndexId[2]}`,{
            method:'PUT',
        headers: {
           'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            completed: isCompletedTask
        })
        })
    ]).then(() => {
        buttonCheckAllTasks.classList.toggle('selected');
        for (let i = 0; i < LisTask.length; i++) {
            LisTask[i].classList.toggle('completed');
            const checkbox = LisTask[i].querySelector(".checkbox");
            checkbox.classList.toggle("selected");

        }
    })

}

fetch(url)
.then(data => data.json())
.then(data => {
    for(let i=0; i<data.length; i++) {
        renderTodo(data[i]);
        // addTask(data[i].text, data[i].completed, data[i].favorite, data[i].id);
    }
} );

