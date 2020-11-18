const todoInput = document.getElementById('todo-input')
const btnAddTodo = document.getElementById('add-todo')
const todoList = document.getElementById('todos-list')

document.addEventListener('DOMContentLoaded', reDrawFromLocalStorage)
btnAddTodo.addEventListener('click', addTodo)

if (JSON.parse(localStorage.getItem('todos')) === null) {
  localStorage.setItem('todos', JSON.stringify([]))
}

function addTodo () {
  let value = todoInput.value
  if (!todoInput.value) return
  let newId = generateUniqueId()
  let newTodo = {
    id: newId,
    content: value,
    checked: false,
  }
  addToLocalStorage(newTodo)
  todoInput.value = ''
}

function generateUniqueId () {
  let min = 1
  let max = 100
  let newId = (Math.random() * (max - min) + min).toFixed(0)
  const todos = JSON.parse(localStorage.getItem('todos'))

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === newId) {
      return generateUniqueId()
    }
  }
  return newId
}

function addToLocalStorage (newTodo) {
  const todos = JSON.parse(localStorage.getItem('todos'))
  todos.push(newTodo)
  localStorage.setItem('todos', JSON.stringify(todos))
  reDrawFromLocalStorage(todos)
}

function removeTodo (id) {
  const todosSting = localStorage.getItem('todos')
  const todos = JSON.parse(todosSting)

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      todos.splice(i, 1)
      break
    }
  }
  localStorage.setItem('todos', JSON.stringify(todos))
}

function changeCheckedItem (id) {
  const todosSting = localStorage.getItem('todos')
  const todos = JSON.parse(todosSting)

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      todos[i].checked = !todos[i].checked
      break
    }
  }
  localStorage.setItem('todos', JSON.stringify(todos))
}

function reDrawFromLocalStorage () {
  const todos = JSON.parse(localStorage.getItem('todos'))
  todoList.innerHTML = ''
  todos.forEach(function (todo) {

    let liTodo = document.createElement('li')
    liTodo.classList.add('todo')

    //btn2
    const btnDiv = document.createElement('div')
    btnDiv.classList.add('btns-wrapper')
    const upBtnTodo = document.createElement('button')
    upBtnTodo.classList.add('up-btn')
    upBtnTodo.classList.add('btn')
    upBtnTodo.innerHTML = `<svg enable-background="new 0 0 32 32" height="32" id="Layer_1" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<path d="M18.221,7.206l9.585,9.585c0.879,0.879,0.879,2.317,0,3.195l-0.8,0.801c-0.877,0.878-2.316,0.878-3.194,0  l-7.315-7.315l-7.315,7.315c-0.878,0.878-2.317,0.878-3.194,0l-0.8-0.801c-0.879-0.878-0.879-2.316,0-3.195l9.587-9.585  c0.471-0.472,1.103-0.682,1.723-0.647C17.115,6.524,17.748,6.734,18.221,7.206z" fill="#515151"/>
</svg>`
    upBtnTodo.addEventListener('click', () => {
      liftUpTodo(todo.id)

      // liTodo.
      console.log('up')
    })

    const downBtnTodo = document.createElement('button')
    downBtnTodo.classList.add('down-btn')
    downBtnTodo.classList.add('btn')
    downBtnTodo.innerHTML = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.1566 23.2393L25.3665 13.6544C26.2112 12.7755 26.2112 11.3375 25.3665 10.4595L24.5978 9.6585C23.7552 8.78052 22.3725 8.78052 21.5288 9.6585L14.5 16.9734L7.47119 9.6585C6.62755 8.78052 5.24485 8.78052 4.40216 9.6585L3.63346 10.4595C2.78885 11.3375 2.78885 12.7755 3.63346 13.6544L12.8454 23.2393C13.2979 23.7113 13.9052 23.9213 14.501 23.8863C15.0938 23.9213 15.7021 23.7113 16.1566 23.2393Z" fill="#515151"/>
</svg>`
    downBtnTodo.addEventListener('click', () => {
      letDownTodo(todo.id)
      liTodo.remove()
      console.log('down')
    })

    btnDiv.appendChild(upBtnTodo)
    btnDiv.appendChild(downBtnTodo)
    liTodo.appendChild(btnDiv)
    //

    const checkboxTodo = document.createElement('input')
    checkboxTodo.type = 'checkbox'
    checkboxTodo.dataset.id = todo.id
    checkboxTodo.classList.add('todo-done')
    checkboxTodo.addEventListener('click', function () {
      changeCheckedItem(todo.id)
      if (checkboxTodo.checked === true) {
        liTodo.classList.add('done')
      } else {
        liTodo.classList.remove('done')
      }
    })
    liTodo.appendChild(checkboxTodo)

    if (todo.checked === true) {
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
      removeTodo(todo.id)
      liTodo.remove()
    })
    liTodo.appendChild(deleteBtnTodo)
    todoList.appendChild(liTodo)
  })
}

function liftUpTodo (id) {
  console.log(id)

  const todosSting = localStorage.getItem('todos')
  const todos = JSON.parse(todosSting)

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      let removed = (todos.splice(i, 1))[0]
      let position = i - 1
      todos.splice(position, 0, removed)
      break
    }
  }
  localStorage.setItem('todos', JSON.stringify(todos))
  reDrawFromLocalStorage()
}

function letDownTodo (id) {
  const todosSting = localStorage.getItem('todos')
  const todos = JSON.parse(todosSting)

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      let removed = (todos.splice(i, 1))[0]
      let position = i + 1
      todos.splice(position, 0, removed)
      break
    }
  }
  localStorage.setItem('todos', JSON.stringify(todos))
  reDrawFromLocalStorage()
}
