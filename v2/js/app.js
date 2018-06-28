let todos = [];

const list = document.querySelector('.list-group');
const todoInput = document.querySelector('#input-todo');
const allChecked = document.querySelector('#chk-allComplete');
const selectTab = document.querySelector('.nav');
const tabElement = document.querySelectorAll('.nav li');
const activeTab = document.querySelector('#active');
let state = 'all';

function renderHTML() {
  list.innerHTML = '';
  let todos1 = [];
  // all / active / comlete

  if (state === 'all') {
    todos1 = todos;
  }

  else if (state === 'active') {
    const activeList = todos.filter(function (todo) {
      return !todo.completed;
    });
    todos1 = activeList;
    // console.log(activeList);
  } 

  else if (state === 'completed') {
    todos1 = todos.filter(function (todo) {
      return todo.completed;
    });
    // console.log(todos1);
  }

  todos1.forEach(function (todo) {

    const checked = todo.completed ? 'checked' : '';

    list.innerHTML += `<li class="list-group-item">
    <div class="hover-anchor">
      <a class="hover-action text-muted">
        <span class="glyphicon glyphicon-remove-circle pull-right" data-id=" ${todo.id} "></span>
      </a>
      <label class="i-checks" for=" ${todo.id} ">
        <input type="checkbox" id=" ${todo.id} " ${checked} ><i></i>
        <span> ${todo.content} </span>
      </label>
    </div>
  </li>`
  });
}

function maxId() {
  const getId = todos.map(function (todo) {
    return todo.id;
  });
  return todos.length ? Math.max.apply(null, getId) + 1 : 1;
}

function todoAdd() {
  todos = [{ id: maxId(), content: todoInput.value, completed: false }].concat(todos);
  todoInput.value = '';
}

todoInput.addEventListener('keyup', function (e) {
  if (e.keyCode !== 13) return;
  todoAdd();
  renderHTML();
});

list.addEventListener('click', function (e) {
  if (e.target.nodeName === 'SPAN') {
    todos = todos.filter(function (todo) {
      return todo.id !== +e.target.dataset.id;
    });
    renderHTML();
  }
});

list.addEventListener('change', function (e) {
  if (e.target.nodeName === 'INPUT') {
    todos = todos.map(function (todo) {
      return +e.target.id === todo.id ? Object.assign({}, todo, { completed: !todo.completed }) : todo;
    });
    // console.log(todos);
    renderHTML();
  }
});

allChecked.addEventListener('change', function (e) {

  todos = todos.map(function (todo) {

    return Object.assign({}, todo, { completed: !todo.completed });
  });

  renderHTML();
  // console.dir(e.target);
});

// All, Active, Completed 탭을 클릭하면 탭의 ul 요소에 li 요소의 class 속성을 동적으로 변경하는 함수.

selectTab.addEventListener('click', function (e) {
  // console.dir(selectTab);
  // console.dir(selectTab.children);
  // console.log(tabElement);
  // const classNameLength = Array.prototype.slice.call(selectTab.children);
  // console.log(Array.isArray(classNameLength));
  // console.log(typeof classNameLength)
  // for (let ci = 0; ci < selectTab.children.length; ci++) {

  //   selectTab.children[ci].className = '';
  // }
  //  e.target.parentNode.className = 'active';
  tabElement.forEach(function (sc) {
    // console.log(sc.id);
    // console.dir(e.target.parentNode.id);
    // console.log(sc);

    sc.classList.remove('active');

    if (sc.id === e.target.parentNode.id) {
      sc.classList.add('active');
      state = sc.id;
      // console.log(state);
    }
  });
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
