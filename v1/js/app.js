var todos = [];

var todoInput = document.querySelector('#input-todo');
var list = document.querySelector('#todo-list');

function maxId () {

  var max = todos.map(function (todo) {

    return todo.id;
  });

  return todos.length ? Math.max.apply(null, max) + 1 : 1;
}

function addTodo () {

  todos = [{ id: maxId(), content: todoInput.value, completed: false }].concat(todos);
  todoInput.value = '';
}

todoInput.addEventListener('keyup', function (e) {

  if ( e.keyCode !== 13 ) return;
  
  addTodo(todoInput.value);

  renderHTML();
});

list.addEventListener('click', function (e) {
  if ( e.target.nodeName === 'SPAN' ) {  

    todos = todos.filter(function (todo) {
      // console.log(todo.id)
      // console.log(e.target.dataset);
      return todo.id !== +e.target.dataset.id;
    });
    renderHTML();
  }
});

list.addEventListener('change', function (e) {
  todos = todos.map(function (todo) {
    return todo.id === +e.target.id ? Object.assign({}, todo, { completed: !todo.completed } ) : todo;
  });
  console.log(todos);
});

function renderHTML () {

  // 기존 HTML을 빈문자열로한다.(이후 HTML을 다시 그린다.)
  list.innerHTML = '';

  todos.forEach(function (todo) { 
  // todo는 todos의 각 요소이고, 요소의 id 값은 todo.id이다.

    var checked = todo.completed ? 'checked' : '';

    list.innerHTML += '<li class="list-group-item"> \
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
}

window.addEventListener('load', function () {

  todos = [
    { id: 1, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: false },
    { id: 3, content: 'JAVASCRIPT', completed: false }
  ];

  renderHTML();
});

