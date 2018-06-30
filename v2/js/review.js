let todos = [];
const list = document.querySelector('#todo-list');
const todoInput = document.querySelector('#input-todo');
const allcheck = document.querySelector('#chk-allComplete');
const tabList = document.querySelector('.nav');
const tabSelect = document.querySelectorAll('.nav li');
const clearBtn = document.querySelector('#btn-removeCompletedTodos');
let completedCount = document.querySelector('#completedTodos');
let state = 'all';


function renderHTML() {
  list.innerHTML = '';
  let todos1 = [];

  if (state === 'all') {
    todos1 = todos;
  } else if (state === 'active') {
    todos1 = todos.filter(todo => (!todo.completed));
  } else if (state === 'completed') {
    todos1 = todos.filter(todo => (todo.completed));
  }

  todos1.forEach(function (todo) {
    const checked = todo.completed ? 'checked' : '';
    list.innerHTML += `<li class="list-group-item">
    <div class="hover-anchor">
      <a class="hover-action text-muted">
        <span class="glyphicon glyphicon-remove-circle pull-right" data-id="${todo.id}"></span>
      </a>
      <label class="i-checks" for="${todo.id}">
        <input type="checkbox" id="${todo.id}" ${checked}><i></i>
        <span>${todo.content}</span>
      </label>
    </div>
  </li>`;
  });
}

function maxId() {
  const getId = todos.map(function (todo) {
    return todo.id;
  });
  return todos.length ? Math.max.call(null, ...getId) + 1 : 1;
}
function todoAdd() {
  todos = [{ id: maxId(), content: todoInput.value, completed: false }].concat(todos);
  todoInput.value = '';
}

todoInput.addEventListener('keyup', function (e) {
  if (e.code !== 'Enter') return;
  todoAdd();
  renderHTML();
});

function clearCompletedCount() {
  const completedCounts = todos.filter(todo => todo.completed);
  completedCount.textContent = completedCounts.length;
  // console.dir(completedCount.textContent);
}

list.addEventListener('click', function (e) {
  if (e.target.nodeName === 'SPAN') {
    todos = todos.filter(todo => (todo.id !== +e.target.dataset.id));
    renderHTML();
  }
});

list.addEventListener('change', function (e) {
  if (e.target.nodeName === 'INPUT') {
    todos = todos.map(function (todo) {
      return todo.id === +e.target.id ? Object.assign({}, todo, { completed: !todo.completed }) : todo;
    });
    // console.dir(todos);
    clearCompletedCount();
  }
});

allcheck.addEventListener('click', function (e) {
  todos = todos.map(todo => Object.assign({}, todo, { completed: !todo.completed }));
  renderHTML();
  clearCompletedCount();
});

tabList.addEventListener('click', function (e) {
  // console.dir(e.target.parentNode.id);
  // console.dir(e.target.textContent);
  // console.dir(typeof tabSelect);
  // e.target.parentNode.className = ' ';
  tabSelect.forEach(function (select) {
    // console.log(select);
    select.classList.remove('active');
    if (select.id === e.target.parentNode.id) {
      select.classList.add('active');
      state = e.target.parentNode.id;
      // console.log(state);
    }
  });
  renderHTML();
});

clearBtn.addEventListener('click', function (e) {
  // console.dir(e);
  todos = todos.filter(todo => !todo.completed);
  completedCount.textContent = 0;
  renderHTML();
});

window.addEventListener('load', function () {
  todos = [
    { id: 1, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: false },
    { id: 3, content: 'JAVASCRIPT', completed: false }
  ];
  renderHTML();
});
