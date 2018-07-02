
let todos = [];
const list = document.querySelector('#todo-list');
const todoInput = document.querySelector('#input-todo');
const allchecked = document.querySelector('#chk-allComplete');
const tabList = document.querySelector('.nav');
const selectTab = document.querySelectorAll('.nav li');
const completedCount = document.querySelector('#completedTodos');
let status = 'all';

function maxId() {
  return todos.length ? Math.max.apply(null, todos.map(todo => todo.id)) + 1 : 1;
}

function todoAdd() {
  todos = [{ id: maxId(), content: todoInput.value, completed: false }].concat(...todos);
  todoInput.value = '';
}

function renderHTML() {
  list.innerHTML = '';
  let todosList = [];

  if (status === 'all') {
    todosList = todos;
  }
  else if (status === 'active') {
    todosList = todos.filter(todo => !todo.completed);
  }
  else if (status === 'completed') {
    todosList = todos.filter(todo => todo.completed);
  }

  todosList.forEach((todo) => {
    const checked = todo.completed ? 'checked' : '';
    list.innerHTML += `<li class="list-group-item">
    <div class="hover-anchor">
    <a class="hover-action text-muted">
      <span class="glyphicon glyphicon-remove-circle pull-right" data-id=${todo.id}></span>
    </a>
    <label class="i-checks" for=${todo.id}>
      <input type="checkbox" id=${todo.id} ${checked}><i></i>
      <span>${todo.content}</span>
    </label>
  </div>
</li>`;
  });
}

function checkedCount() {
  completedCount.textContent = todos.filter(todo => todo.completed).length;
  console.dir(completedCount.textContent);
}

function removeCompleted() {
  todos = todos.filter(todo => !todo.completed);
  completedCount.textContent = 0;
  // renderHTML();
}

window.addEventListener('load', () => {
  todos = [
    { id: 3, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: false },
    { id: 1, content: 'JAVASCRIP', completed: false }
  ];
  renderHTML();
});

todoInput.addEventListener('keyup', (e) => {
  if (e.keyCode !== 13) return;
  todoAdd();
  renderHTML();
});

list.addEventListener('change', (e) => {
  if (e.target.nodeName === 'INPUT') {
    todos = todos.map(todo => (todo.id === +e.target.id ? Object.assign({}, todo, { completed: !todo.completed }) : todo));
  }
  console.dir(todos);
  // console.dir(typeof e.target.id);
  checkedCount();
  renderHTML();
});

list.addEventListener('click', (e) => {
  if (e.target.nodeName !== 'SPAN') return;
  // console.dir(e.target);
  todos = todos.filter(todo => todo.id !== +e.target.dataset.id);
  renderHTML();
});

allchecked.addEventListener('change', () => {
  todos = todos.map(todo => Object.assign({}, todo, { completed: !todo.completed }));
  // console.log(todos);
  checkedCount();
  renderHTML();
});

tabList.addEventListener('click', (e) => {
  selectTab.forEach((select) => {
    select.classList.remove('active');
    if (select.id === e.target.parentNode.id) {
      select.classList.add('active');
      status = select.id;
    }
  // console.dir(status);
  });
  renderHTML();
});

document.querySelector('#btn-removeCompletedTodos').addEventListener('click', () => {
  removeCompleted();
  renderHTML();
})
