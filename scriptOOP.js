const arrTodos = [
  {
    id: 1,
    content: 'blabla',
    checked: false,
  },
  {
    id: 2,
    content: 'bread',
    checked: false,
  },
]

class Todo {
  constructor (arr) {
    // тут то, что выполнится при инициации
    console.log('INIT')
    this.redraw(arr)
  }

  create() {}
  remove() {}
  redraw() {}
}

let todo1 = new Todo(arrTodos);

todo1.create('')
