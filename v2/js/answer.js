/*eslint-disable */
(function () {
  var todos = [];
  // All / Active / Completed
  var status = 'all';

  var inputTodo = document.getElementById('input-todo');
  var todoList = document.getElementById('todo-list');

  // V2
  // filtering
  var filterTodosByStatus = function () {
    return todos.filter(function (todo) {
      switch (status) {
        case 'active':
          return !todo.completed; // completed === false
        case 'completed':
          return todo.completed;  // completed === true
        default:
          return true; // all
      }
    });
  };

  var countCompletedTodos = function () {
    return todos.filter(function (todo) {
      return todo.completed
    }).length;
  };

  var countActiveTodos = function () {
    return todos.filter(function (todo) {
      return !todo.completed;
    }).length;
  };

  var renderTodos = function () {
    var html = '';

    var _todos = filterTodosByStatus();

    _todos.forEach(function(todo) {
      var checked = todo.completed ? 'checked' : '';

      html += '<li class="list-group-item"> \
        <div class="hover-anchor"> \
          <a class="hover-action text-muted"> \
            <span class="glyphicon glyphicon-remove-circle pull-right" data-id="' + todo.id + '"></span> \
          </a> \
          <label class="i-checks" for="' + todo.id + '"> \
            <input type="checkbox" id="' + todo.id + '"' + checked + '><i></i> \
            <span>' + todo.content + '</span> \
          </label> \
        </div> \
      </li>';
    });

    todoList.innerHTML = html;

    document.getElementById('completedTodos').innerHTML = countCompletedTodos();
    document.getElementById('activeTodos').innerHTML = countActiveTodos();
  };

  var generateTodoId = function () {
    return todos.length ? Math.max.apply(null, todos.map(function (todo){
      return todo.id;
    })) + 1 : 1;
  };

  var getTodos = function () {
    // 서버로부터 todos를 취득(잠정 처리)
    todos = [
      { id: 3, content: 'HTML', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 1, content: 'Javascript', completed: false }
    ];
    renderTodos();
    console.log('[GET]\n', todos);
  };

  var addTodo = function (content) {
    todos = [{ id: generateTodoId(), content, completed: false }].concat(todos);
    // todos = [{ id: generateTodoId(), content, completed: false }, ...todos];
    renderTodos();
    console.log('[ADD]\n', todos);
  };

  var removeTodo = function (id) {
    todos = todos.filter(function (todo) {
      return todo.id != id;
    });
    renderTodos();
    console.log('[REMOVE]\n', todos);
  };

  var toggleTodoComplete = function (id) {
    todos = todos.map(function (todo) {
      return todo.id === +id ? Object.assign({}, todo, { completed: !todo.completed }) : todo;
    } );
    renderTodos();
    console.log('[TOGGLE-COMP]\n', todos);
  };

  var toggleTodoAllComplete = function (chkStatus) {
    todos = todos.map(function (todo) {
      return Object.assign({}, todo, { completed: chkStatus });
    });
    renderTodos();
    console.log('[ALL-COMP]\n', todos);
  };

  var removeCompletedTodo = function () {
    todos = todos.filter(function (todo) {
      return !todo.completed;
    });
    renderTodos();
    console.log('[REMOVE-COMP]\n', todos);
  };

  // load 이벤트는 모든 리소스(image, script, css 등)의 로드가 완료하면 발생한다.
  window.addEventListener('load', getTodos);

  inputTodo.addEventListener('keyup', function (e) {
    if (e.keyCode !== 13 || !inputTodo.value) return;
    addTodo(inputTodo.value);
    inputTodo.value = '';
  });

  todoList.addEventListener('change', function (e) {
    toggleTodoComplete(e.target.id);
  });

  todoList.addEventListener('click', function (e) {
    if (!e.target || e.target.nodeName !== 'SPAN' || e.target.parentNode.nodeName === 'LABEL') return;
    removeTodo(e.target.dataset.id);
  });

  // V2
  document.querySelector('.nav').addEventListener('click', function (e) {
    if (!e.target || e.target.nodeName !== 'A') return;

    // 모든 .nav > li 요소 취득
    var navs = [].slice.call(this.childNodes);

    // 모든 .nav > li 요소에서 active 클래스 제거
    navs.forEach(function (nav) {
      // Skip text node
      if (nav.nodeName === 'LI') {
        nav.classList.remove('active');
      }
    });

    // 클릭된 a 요소의 부모 요소(.nav > li)에 active 클래스 추가
    var selectedNav = e.target.parentNode;
    selectedNav.classList.add('active');

    // 활성화된 tab 상태
    status = selectedNav.id;
    renderTodos();
  });

  document.getElementById('chk-allComplete').addEventListener('change', function (e) {
    toggleTodoAllComplete(e.target.checked);
  });

  // 완료된 todo를 일괄 제거
  document.getElementById('btn-removeCompletedTodos').addEventListener('click', function () {
    removeCompletedTodo();
  });
}());