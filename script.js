// function FunctionArray (count) {
//   var arr = []
//   for(var i=0; i<count; i++) {
//     arr[i]= function () {
//       // console.log('we are in func'+i)
//       alert(i)
//     }
//   }
//   return arr
// }
// var i = 100
// var arr = FunctionArray(i)
// arr[1]()
// console.log(arr[0]())

// let user = {
//   firstName: "Вася"
// };
//
// function func() {
//   alert(this.firstName);
// }
//
// let funcUser = func.bind(user);
// console.log(funcUser())

const todoInput = document.getElementById('todo-input')
const btnAddTodo = document.getElementById('add-todo')
const todoList = document.getElementById('todos-list')

btnAddTodo.addEventListener('click', addTodo)

const arrTodos = [
  {
    id: 2,
    content: 'desf',
    checked: false,
  }
]

if(arrTodos.length > 0) {
  reCreateTodo(arrTodos);
}

function reCreateTodo (arrTodos) {
  todoList.innerHTML = ''
  for (let i = 0; i < arrTodos.length; i++) {
    let liTodo = document.createElement('li')
    liTodo.classList.add('todo')

    const checkboxTodo = document.createElement('input')
    checkboxTodo.type = 'checkbox'
    liTodo.appendChild(checkboxTodo)

    const textTodo = document.createElement('div')
    textTodo.classList.add('todo-text')
    textTodo.innerHTML = arrTodos[i].content
    liTodo.appendChild(textTodo)

    const deleteBtnTodo = document.createElement('button')
    deleteBtnTodo.classList.add('delete-btn')
    deleteBtnTodo.innerHTML = 'x'
    liTodo.appendChild(deleteBtnTodo)

    todoList.appendChild(liTodo)
  }
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
  arrTodos.push(newTodo);
  reCreateTodo(arrTodos);
  todoInput.value = ''
}

function generateUniqueId () {
  let min = 1;
  let max = 100;
  let newId = (min + Math.random() * (max + 1 - min)).toFixed(0);
  for(let i = 0; i < arrTodos.length; i++) {
    if(arrTodos[i].id !== newId) {
      return newId;
    }
  }
}


