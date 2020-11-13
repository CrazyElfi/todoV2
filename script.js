const todoInput = document.getElementById('todo-input')
const btnAddTodo = document.getElementById('add-todo')
const todoList = document.getElementById('todos-list')


document.addEventListener('DOMContentLoaded', reDrawFromLocalStorage);
btnAddTodo.addEventListener('click', addTodo)

if(JSON.parse(localStorage.getItem('todos')) === null) {
  localStorage.setItem('todos', JSON.stringify([]))
}

function addTodo () {
  let value = todoInput.value
  if (!todoInput.value) return
  let newId = generateUniqueId();
  console.log('newId', newId);
  let newTodo = {
    id: newId,
    content: value,
    checked: false,
  }
  addToLocalStorage(newTodo);
  todoInput.value = ''
}

function generateUniqueId () {
  let min = 1;
  let max = 100;
  let newId = (Math.random() * (max - min) + min).toFixed(0);
  const todos = JSON.parse(localStorage.getItem('todos'));

  for(let i = 0; i < todos.length; i++) {
    if(todos[i].id === newId) {
      return generateUniqueId();
    }
  }
  return newId;
}

function addToLocalStorage (newTodo) {
  const todos = JSON.parse(localStorage.getItem('todos'));
  todos.push(newTodo);
  localStorage.setItem('todos', JSON.stringify(todos));
  reDrawFromLocalStorage (todos);
}

function removeTodo (id) {
  const todosSting = localStorage.getItem('todos')
  const todos = JSON.parse(todosSting);

  for(let i = 0; i < todos.length; i++) {
    if(todos[i].id === id) {
      todos.splice(i, 1);
      break;
    }
  }
  localStorage.setItem('todos', JSON.stringify(todos))
}

function changeCheckedItem (id) {
  const todosSting = localStorage.getItem('todos')
  const todos = JSON.parse(todosSting);

  for(let i = 0; i < todos.length; i++) {
    if(todos[i].id === id) {
      todos[i].checked = !todos[i].checked
      break;
    }
  }
  localStorage.setItem('todos', JSON.stringify(todos))
}

function reDrawFromLocalStorage () {
  const todos = JSON.parse(localStorage.getItem('todos'));
  console.log('reDrawFromLocalStorage', todos)
  // if(!todos) return

  todoList.innerHTML = ''
  todos.forEach(function (todo) {

    let liTodo = document.createElement('li')
    liTodo.classList.add('todo')

    const checkboxTodo = document.createElement('input')
    checkboxTodo.type = 'checkbox'
    checkboxTodo.dataset.id = todo.id
    checkboxTodo.classList.add('todo-done')
    checkboxTodo.addEventListener('click', function () {
      changeCheckedItem(todo.id)
      if(checkboxTodo.checked === true) {
        liTodo.classList.add('done')
      } else {
        liTodo.classList.remove('done')
      }
    })
    liTodo.appendChild(checkboxTodo)

    if(todo.checked === true) {
      checkboxTodo.checked = true
      liTodo.classList.add('done')
    }

    const textTodo = document.createElement('div')
    textTodo.classList.add('todo-text')
    textTodo.innerHTML = todo.content
    liTodo.appendChild(textTodo)

    const deleteBtnTodo = document.createElement('button')
    deleteBtnTodo.classList.add('delete-btn')
    deleteBtnTodo.innerHTML = 'x'
    deleteBtnTodo.dataset.id = todo.id
    deleteBtnTodo.addEventListener('click', function () {
      removeTodo(todo.id);
      liTodo.remove()
    })
    liTodo.appendChild(deleteBtnTodo)

    todoList.appendChild(liTodo)
  })
}
