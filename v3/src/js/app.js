import axios from 'axios';

(function () {
  // TODO:
  let todos = [];
  let todosList = [];
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

  function checkedCount() {
    completedCount.textContent = todos.filter(todo => todo.completed).length;
    // console.dir(completedCount.textContent);
  }

  function isCompletedChecked() {
    return todos.length ? todos.length === todos.filter(({ completed }) => completed).length : false;
  }

  function renderHTML() {
    list.innerHTML = '';

    if (status === 'all') {
      todosList = todos;
    }
    else if (status === 'active') {
      todosList = todos.filter(todo => !todo.completed);
    }
    else if (status === 'completed') {
      todosList = todos.filter(todo => todo.completed);
    }

    todosList.forEach(todo => {
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

    checkedCount();
    allchecked.checked = isCompletedChecked();
  }

  function todoAdd() {
    // axios.post는 서버에 새로운 데이터를 생성한다.
    // 서버에 새로운 데이터 생성을 보낼 때 객체를 JSON.stringify로 문자열로 만들어서 전송한다.
    axios.post('/todos', { id: maxId(), content: todoInput.value, completed: false })
    // 서버 응답이 완료되면(응답 상태가 201) 실행 될 함수.
      .then(() => {
        // /todos에 요청을 보낸다.
        axios.get('/todos')
        // 서버에서 응답이 완료되면 최신의 데이터를 todos에 할당한다.  
          .then(({ data }) => {
            todos = data;
            renderHTML();
          });
        todoInput.value = '';
      });
    // todos = [{ id: maxId(), content: todoInput.value, completed: false }].concat(...todos);
  }

  function removeCompleted() {
    todos = todos.filter(todo => !todo.completed);
    completedCount.textContent = 0;
    // renderHTML();
  }

  // window.addEventListener('load', () => {
  //   todos = [
  //     { id: 3, content: 'HTML', completed: false },
  //     { id: 2, content: 'CSS', completed: false },
  //     { id: 1, content: 'JAVASCRIP', completed: false }
  //   ];
  //   renderHTML();
  // });

  todoInput.addEventListener('keyup', e => {
    if (e.keyCode !== 13) return;
    todoAdd();
  });

  list.addEventListener('change', e => {
    // console.dir(e.target);
    if (e.target.nodeName === 'INPUT') {
      axios.patch(`/todos/${e.target.id}`, { completed: e.target.checked })
        .then(() => {
          axios.get('/todos')
            .then(({ data }) => {
              todos = data;
              // console.dir(todos);
              // console.dir(completed);
              renderHTML();
            });
        });
      // todos = todos.map(todo => (todo.id === +e.target.id ? Object.assign({}, todo, { completed: !todo.completed }) : todo));
    }
    // console.dir(todos);
  });

  list.addEventListener('click', e => {

    if (e.target.nodeName !== 'SPAN') return;
    axios.delete(`/todos/${e.target.dataset.id}`)
      .then(() => {
        // console.dir(data);
        axios.get('/todos')
          .then(({ data }) => {
            todos = data;
            renderHTML();
          });
      });
    // todos = todos.filter(todo => todo.id !== +e.target.dataset.id);
  });

  allchecked.addEventListener('change', e => {
    console.dir(e.target);
    axios.patch('/todos', { completed: e.target.checked })
      .then(() => {
        axios.get('/todos')
          .then(({ data }) => {
            todos = data;
            renderHTML();
          });
      });
    // todos = todos.map(todo => Object.assign({}, todo, { completed: !todo.completed }));
    // console.dir(e.target);
    // renderHTML();
  });

  tabList.addEventListener('click', e => {
    selectTab.forEach(select => {
      select.classList.remove('active');
      if (select.id === e.target.parentNode.id) {
        select.classList.add('active');
        status = select.id;
      }
      // console.dir(select);
    });
    renderHTML();
  });

  document.querySelector('#btn-removeCompletedTodos').addEventListener('click', () => {
    axios.delete('/todos/completed')
      .then(() => {
        axios.get('/todos')
          .then(({ data }) => {
            todos = data;
            renderHTML();
          });
      });
    // removeCompleted();
    // renderHTML();
  });

  window.addEventListener('load', () => {
    axios.get('/todos')
      .then(({ data }) => {
        todos = data;
        // console.log(todos);
        // console.log(todosList);
        renderHTML();
      });
  });
}(axios));
