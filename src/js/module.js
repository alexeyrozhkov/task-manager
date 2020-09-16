
const form = document.querySelector('.createTaskForm');
 form.onsubmit = function(event) {
     event.preventDefault();

     const formData = new FormData(event.target);
     const task = formData.get('task');
     addTask(task);

     form.reset();

 }
 const addTask = (task) => {
     const tasksDom = document.querySelector('.tasks');
     const taskDom = document.createElement('li');

     taskDom.innerHTML = task;
     tasksDom.prepend(taskDom);
     }