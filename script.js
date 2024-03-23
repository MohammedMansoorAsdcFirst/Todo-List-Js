let input = document.querySelector('.input');
let addTodoBtn = document.querySelector('#addTodoBtn');
let todosContainer = document.querySelector('.todos');
let noTodos = document.querySelector('.noTodos');

// Retrieve todos array from local storage
let storedTodos = localStorage.getItem('todo');
let allTodos = storedTodos ? JSON.parse(storedTodos) : [];

function handleEdit(e) {
    let todoElement = e.target.closest('.todo');
    let index = Array.from(todoElement.parentNode.children).indexOf(todoElement);
    input.value = allTodos.splice(index, 1);
    handleDelete(e)
}

function handleDelete(e) {
    let todoElement = e.target.closest('.todo');
    let index = Array.from(todoElement.parentNode.children).indexOf(todoElement);
    allTodos.splice(index, 1);
    localStorage.setItem('todo', JSON.stringify(allTodos));
    displayTodos();
}

function handleCheckbox(e) {
    let todoElement = e.target.closest('.todo');
    let titleElement = todoElement.querySelector('h3');
    let index = Array.from(todoElement.parentNode.children).indexOf(todoElement);
    let isChecked = e.target.checked;

    allTodos[index].checked = isChecked;

    localStorage.setItem('todo', JSON.stringify(allTodos));

    let lineThrough = isChecked ? 'line-through' : 'none';
    titleElement.style.textDecoration = lineThrough;
}



// Function to create HTML element for a todo
function createTodoElement(title) {
    return `<div class="todo">
        <div class="leftTodo">
            <input onchange='handleCheckbox(event)' id="checkbox" type="checkbox">
            <h3>${title}</h3>
        </div>
        <div class="rightTodo">
            <button onclick={handleEdit(event)} class="editBtn">Edit</button>
            <button onclick='handleDelete(event)' class="deleteBtn">Delete</button>
        </div>
    </div>`;
}

// Display stored todos
function displayTodos() {
    if (allTodos === null || allTodos.length === 0) {
        noTodos.style.display = 'flex';
    } else {
        todosContainer.innerHTML = ''
        noTodos.style.display = 'none';
        allTodos.forEach(title => {
            todosContainer.innerHTML += createTodoElement(title);
        });
    }
}

// Initial display
displayTodos();

addTodoBtn.addEventListener('click', () => {
    let title = input.value;
    allTodos.push(title);
    localStorage.setItem('todo', JSON.stringify(allTodos));
    displayTodos();
    input.value = '';
});