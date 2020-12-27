
const form = document.querySelector('.createTaskForm');
const url = 'http://localhost:3030/todos';

form.onsubmit = function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const task = formData.get('task');
     
    if (task.trim()) {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text : task,
                completed : false,
                favorite: false
            })
        })
        .then(data => data.json())
        .then((data) => {
            addTask(task, false, false, data.id);
            form.reset();
        })
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
        inputText.disabled = true;
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



fetch(url)
.then(data => data.json())
.then(data => {
    for(let i=0; i<data.length; i++) {
        addTask(data[i].text, data[i].completed, data[i].favorite, data[i].id);
    }
} );

