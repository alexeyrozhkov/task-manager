
const form = document.querySelector('.createTaskForm');
const url = 'http://localhost:3030/todos';
const buttonCheckAllTasks = document.querySelector('.selectAll');

const todos = [];

/**
 * 
 * @param {method: string; body?:Object; path?:string}  
 */
function sendRequest({method, body, path}) {
    const requestUrl = path || path === 0 ? `${url}/${path}` : url;
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
    return fetch(requestUrl, options)
        .then(data => {
            if (data.status === 200) {
                return data;
            }
            throw new Error(data.status);
        })
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
    sendRequest({
        method: 'POST',
        body: newTodo
    })
    .then(data => data.json())
    .then((data) => {
        newTodo.id = data.id;
        todos.push(newTodo);
        renderTodo(newTodo)
        form.reset();
    })
}

/**
 * 
 * @param {number} id 
 */
function deleteTodo(id) {
    return sendRequest({
        method: "DELETE",
        path: id
    })
    .then(() => {
        const deletedTodoIndex = todos.findIndex(item => item.id === id);
        if (deletedTodoIndex === -1) {
            console.error("Удаляемого элемента нет в массиве :( ");
            return;
        };
        todos.splice(deletedTodoIndex, 1);
    })
}

/**
 * 
 * @param {number} id 
 * @param {value} value
 */
function setComplete(id, value) {
    return sendRequest({
        method: "PUT",
        path: id,
        body: {
            completed: value
        }
    }).then(() => {
        const todo = todos.find(item => item.id === id);
        if (todo) {
            todo.completed = value;
        } else {
            console.error("Редактируемого элемента нет в массиве :( ");
        }
    })
}

/**
 * 
 * @param {number} id 
 * @param {value} value
 */
function setFavorite(id, value) {
    return sendRequest({
        method: "PUT",
        path: id,
        body: {
            favorite: value
        }
    }).then(() => {
        const todo = todos.find(item => item.id === id);
        if (todo) {
            todo.favorite = value;
        } else {
            console.error("Редактируемого элемента нет в массиве :( ");
        }
    })
}

/**
 * 
 * @param {number} id 
 * @param {string} text
 */
function editTodo(id, text) {
    return sendRequest({
        method: "PUT",
        path: id,
        body: {
            text: text
        }
    })
    .then(() => {
        const todo = todos.find(item => item.id === id);
        if (todo) {
            todo.text = text;
        } else {
            console.error("Редактируемого элемента нет в массиве :( ");
        }
    })
}

/**
 * 
 * @param {number[]} ids
 * @param {boolean} value
 */
function getCheckAllRequest(ids, value) {
    const requests = [];
    for (let i = 0; i < ids.length; i++) {
        requests.push(
            fetch(`${url}/${ids[i]}`,{
                method:'PUT',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    completed: value
                })
            })
        )
    }
    return requests;
}

/**
 * 
 * @param {Node} taskDom 
 */
const addRemoveHandler = (taskDom) => {
    const removeDom = taskDom.querySelector('.remove');
    removeDom.onclick = () => {
        const id = +taskDom.dataset.id;
        deleteTodo(id)
        .then(() => {
            taskDom.remove();
        })
    }
}

/**
 * 
 * @param {Node} taskDom 
 */
const addCompleteHandler = (taskDom) => {
    const checkboxDom = taskDom.querySelector('.checkbox');
    checkboxDom.onclick = () => {
        const isCompleted = checkboxDom.classList.contains('selected');
        const id = +taskDom.dataset.id;
        setComplete(id, !isCompleted)
        .then(() => {
            checkboxDom.classList.toggle('selected');
            taskDom.classList.toggle('completed');
        })
    }

}

/**
 * 
 * @param {Node} taskDom 
 */
const addFavoriteHandler = (taskDom) =>{
    const starDom = taskDom.querySelector('.star');
    starDom.onclick = () => {
        const isFavorite = starDom.classList.contains('selected');
        const id = +taskDom.dataset.id;
        setFavorite(id, !isFavorite)
        .then(() => {
            starDom.classList.toggle('selected');
        })
    
    }
}

/**
 * 
 * @param {Node} taskDom 
 */
const editTaskButton = (taskDom) => {
    const editButton = taskDom.querySelector('.edit');
    editButton.onclick = () => {
        const inputText = taskDom.querySelector('.taskInput');
        inputText.disabled = '';
    }
}

/**
 * 
 * @param {Node} taskDom 
 */
const onblurInput = (taskDom) => {
    const inputText = taskDom.querySelector('.taskInput');
    
    inputText.onblur = () => {
        const textValue = inputText.value;
        const id = +taskDom.dataset.id;
        editTodo(id, textValue)
        .then(() => {
            inputText.disabled = true;
        })
        .catch(() => {
            const todo = todos.find(item => item.id === id);
            inputText.value = todo.text;
            inputText.disabled = true;
        })
        
    }
}

/**
 * 
 * @param {event} event 
 */
form.onsubmit = function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const task = formData.get('task');
     
    if (task.trim()) {
        addTodo(task)
    } 
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
    const requests = getCheckAllRequest(ArrayIndexId, isCompletedTask)
    Promise.all(requests).then(() => {
        buttonCheckAllTasks.classList.toggle('selected');
        for (let i = 0; i < LisTask.length; i++) {
            if (isCompletedTask) {
                LisTask[i].classList.add('completed');
                const checkbox = LisTask[i].querySelector(".checkbox");
                checkbox.classList.add("selected");
            } else {
                LisTask[i].classList.remove('completed');
                const checkbox = LisTask[i].querySelector(".checkbox");
                checkbox.classList.remove("selected");
            }
        }
    })
}


// INIT

fetch(url)
.then(data => data.json())
.then(data => {
    let allCompleted = true;
    for(let i=0; i<data.length; i++) {
        todos.push(data[i]);
        renderTodo(data[i]);
        if (allCompleted && !data[i].completed) {
            allCompleted = false;
        } 
    }
    if (allCompleted) {
        buttonCheckAllTasks.classList.add("selected");
    }
});

