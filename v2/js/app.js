let todos = [];

const list = document.querySelector('.list-group');
const todoInput = document.querySelector('#input-todo');
const allChecked = document.querySelector('#chk-allComplete');
const selectTab = document.querySelector('.nav');
const tabElement = document.querySelectorAll('.nav li');
const clearCompletedCount = document.querySelector('#completedTodos');
const clearBtn = document.querySelector('#btn-removeCompletedTodos');
let state = 'all';

// HTML을 만드는 함수
function renderHTML() {
  list.innerHTML = '';
  let todos1 = [];

  // all / active / comlete
  if (state === 'all') {
    todos1 = todos;
  }

  else if (state === 'active') {
    todos1 = todos.filter(function (todo) {
      return !todo.completed;
    });
    // console.log(activeList);
  }

  else if (state === 'completed') {
    todos1 = todos.filter(function (todo) {
      return todo.completed;
    });
    // console.log(todos1);
  }
  // todos1(빈 배열)에 탭의 상태에 따라 필터된 todos(배열)를 forEach 함수를 이용해서 innetHTML한다.
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
  </li>`;
  });
}

// todos 배열에 새로 추가 될 요소의 id값(가장 마지막 id에서 +1)을 만드는 함수
function maxId() {
  const getId = todos.map(function (todo) {
    return todo.id;
  });
  return todos.length ? Math.max.apply(null, getId) + 1 : 1;
}

// todos 배열에 새로 추가할 요소를 만드는 함수
function todoAdd() {
  todos = [{ id: maxId(), content: todoInput.value, completed: false }].concat(todos);
  todoInput.value = '';
}

// 입력창에 입력한 값을 화면에 그리는 함수
todoInput.addEventListener('keyup', function (e) {
  if (e.keyCode !== 13) return;
  todoAdd();
  renderHTML();
});

// 목록을 삭제하는 함수
list.addEventListener('click', function (e) {
  if (e.target.nodeName === 'SPAN') {
    todos = todos.filter(function (todo) {
      return todo.id !== +e.target.dataset.id;
    });
    renderHTML();
  }
});

// 리스트를 체크했을 때 체크된 리스트의 개수를 정의하는 함수
function completedCount() {
  const completedCounts = todos.filter(function (todo) {
    return todo.completed;
  });
  clearCompletedCount.textContent = completedCounts.length;
  // clearCompletedCount = todos2.length;
  console.dir(clearCompletedCount);
}

// clear 버튼 클릭했을 때 체크되어 있는 리스트를 삭제하는 이벤트
clearBtn.addEventListener('click', function () {
  todos = todos.filter(function (todo) {
    return !todo.completed;
  });
  clearCompletedCount.textContent = 0;
  renderHTML();
});

// 체크박스를 클릭했을 때 체크 또는 체크 해제하는 이벤트
list.addEventListener('change', function (e) {
  if (e.target.nodeName === 'INPUT') {
    todos = todos.map(function (todo) {
      return +e.target.id === todo.id ? Object.assign({}, todo, { completed: !todo.completed }) : todo;
    });
    // console.dir(e.target.checked);
    completedCount();
    renderHTML();
  }
});

// allcheck 버튼 클릭시 모든 리스트를 체크하는 함수
allChecked.addEventListener('change', function () {
  todos = todos.map(function (todo) {
    return Object.assign({}, todo, { completed: !todo.completed });
  });

  completedCount();
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
      state = e.target.parentNode.id;
      console.dir(sc);
      console.dir(e.target);
    }
  });
  renderHTML();
});

// 서버에게 받은 데이터를 객체화해서 todos 배열에 할당하는 이벤트
window.addEventListener('load', function () {
  todos = [
    { id: 1, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: false },
    { id: 3, content: 'JAVASCRIPT', completed: false }
  ];

  renderHTML();
});
