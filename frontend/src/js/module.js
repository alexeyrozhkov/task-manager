
const form = document.querySelector('.createTaskForm');
form.onsubmit = function(event) {
     event.preventDefault();

     const formData = new FormData(event.target);
     const task = formData.get('task');
     
     if (task.trim()) {
        addTask(task);
        form.reset();
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
         taskDom.remove();
     }
 }

 const addCompleteHandler = (taskDom) => {
     const checkboxDom = taskDom.querySelector('.checkbox');
     checkboxDom.onclick = () => {
         checkboxDom.classList.toggle('selected');
         taskDom.classList.toggle('completed');
     }

 }
const addFavoriteHandler = (taskDom) =>{
    const starDom = taskDom.querySelector('.star');
    starDom.onclick = () => {
        starDom.classList.toggle('selected');
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
const addTask = (task) => {
    const tasksDom = document.querySelector('.tasks');
    const taskDom = document.createElement('li');

    taskDom.innerHTML = getUpdatedTemplate(task);
    tasksDom.prepend(taskDom);
    addRemoveHandler(taskDom);
    addCompleteHandler(taskDom);
    addFavoriteHandler(tasksDom);
    editTaskButton(taskDom);
    onblurInput(taskDom);
}