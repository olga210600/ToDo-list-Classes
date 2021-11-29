const addBtn = document.getElementById('add-btn');
const deskTaskInput = document.getElementById('user-task');
const todoWrapper = document.querySelector('.task-wrapper');

let tasks = !localStorage.tasks ? [] : JSON.parse(localStorage.getItem('tasks'));

let todoItems = [];


class ToDoList {
    constructor(index) {
        this.index = index
    }


    task(description) {
        return ({
            description,
            completed: false,
            isEdit: false
        })
    }

    fillHtmlList() {
        todoWrapper.innerHTML = "";

        if (tasks.length) {
            tasks.forEach((item, index) => {
                todoWrapper.innerHTML += createTemplate(item, index);
            });
            todoItems = document.querySelectorAll('.todo-item');
        }
    }


    updateLocal() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    //
    completeTask(index) {
        tasks[index].completed = !tasks[index].completed;

        if (tasks[index].completed) {
            todoItems[index].classList.add('checked');
        } else {
            todoItems[index].classList.remove('checked')
        }

        this.updateLocal();
        this.fillHtmlList();
    }

    //

    listener() {
        if (deskTaskInput.value) {
            const editableTask = tasks.reduce((acc, curr, index) => {
                if (curr.isEdit === true) {
                    curr.description = deskTaskInput.value;
                    curr.isEdit = false

                    acc.task = curr;
                    acc.index = index;
                }

                return acc;
            }, {task: {}, index: null});

            if (editableTask.index === null) {
                tasks.push(this.task(deskTaskInput.value));
            } else {
                tasks.splice(editableTask.index, 1, editableTask.task)
            }

            deskTaskInput.value = '';
            this.fillHtmlList()
            this.updateLocal();
        }
    }


    deleteTask(index) {
        console.log('click')
        todoItems[index].classList.add('deletion');

        tasks.splice(index, 1);
        this.updateLocal();
        this.fillHtmlList();
    }

    editTask(index) {
        deskTaskInput.value = todoItems[index].innerHTML;
        tasks[index].isEdit = !tasks[index].isEdit;
    }
}



const list = new ToDoList();

list.fillHtmlList()
function createTemplate(task, index) {
    console.log('taskb', task)
    return `
        <div class="description">
            <div class="todo-item ${task.completed ? 'checked' : ''}" onclick="completeTask(${index})">${task.description}</div>
            <div class="buttons">
                <button onclick="list.editTask(${index})" class="btn-edit">&#9998;</button>
                <button onclick="list.deleteTask(${index})" class="btn-delete">&#x2716;</button>
            </div>
        </div>
    `
}


addBtn.addEventListener('click', () => list.listener())



// console.log( list.listener(8))

