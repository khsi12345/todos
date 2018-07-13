import { Pipe, PipeTransform } from '@angular/core';

interface Todo {
  id: number;
  content: string;
  completed: boolean;
}

@Pipe({
  name: 'todosFilter'
})
export class TodosFilterPipe implements PipeTransform {

  transform(todos: Todo[], state: string): Todo[] {
    return todos.filter(({ completed }) => {
      if (state === 'Active') {
        return !completed;
      } else if (state === 'Completed') {
        return completed;
      }
      return true;
    });
  }

}
