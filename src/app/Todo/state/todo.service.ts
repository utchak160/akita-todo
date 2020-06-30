import {Injectable} from '@angular/core';
import {TodoApiService} from '../../services/todo.service';
import {TodoStore} from './todo.store';
import {Observable} from 'rxjs';
import {Todo} from '../../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private todoApiService: TodoApiService, private store: TodoStore) {
  }

  storeTodo() {
    this.todoApiService.getTodos().subscribe((todos) => {
      this.store.set(todos);
      this.store.update({todo: todos});
    });
  }

  createTodo(data: any) {
    this.todoApiService.addTodo(data).subscribe((todo) => {
      this.store.add(todo);
      this.store.update(state => {
        return {
          ...state,
          todo
        };
      });
    });
  }
}
