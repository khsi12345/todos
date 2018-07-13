import { Component, OnInit } from '@angular/core';

interface Todo {
  id: number;
  content: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  todos: Todo[];
  content = '';
  tabs = ['All', 'Active', 'Completed'];
  state = 'All';

  constructor() {}

  ngOnInit() {
    this.todos = [
      { id: 3, content: 'HTML', completed: true},
      { id: 2, content: 'CSS', completed: false},
      { id: 1, content: 'JAVA', completed: false}
    ];

  }

  maxId() {
    return this.todos.length ? Math.max.apply(null, this.todos.map(todo => todo.id)) + 1 : 1;
  }

  // input 폼에 입력한 값을 todos에 할당
  addTodo() {
    // console.dir(this.content);
    if ( !this.content ) { return; }
    this.todos = [{ id: this.maxId(), content: this.content , completed: false}, ...this.todos];
    this.content = '';
    // console.dir(this.todos);
  }

  // todo의 체크박스 상태 변경
  toggelCompleted(id: number) {
    this.todos = this.todos.map(todo => todo.id === id ? Object.assign({}, todo, {completed: !todo.completed}) : todo);
  }

  // todo 요소를 삭제
  removeTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  // 모든 todo 요소를 체크
  allCompleted(checked: boolean) {
    // console.dir(this.textContent);
     this.todos = this.todos.map(todo => Object.assign({}, todo, {completed: checked}));
  }

  // todo.completed가 true인 요소의 개수
  completedTodo() {
    return this.todos.filter(todo => todo.completed).length;
  }

  // todo.completed가 true인 요소를 삭제
  completedTodoClear() {
    this.todos = this.todos.filter(todo => !todo.completed);
  }

  // todo.completed가 false인 요소의 개수
  activeTodo() {
    return this.todos.filter(todo => !todo.completed).length;
  }

  isAllCompleted(): boolean {
    return this.todos.length ? this.todos.length === this.todos.filter(({completed}) => completed).length : false;
  }
}
