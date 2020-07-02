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

  getTodoById(id: string) {
    return this.todoApiService.getTodoById(id);
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

  updateTodo(data: any, id: string) {
    this.todoApiService.updateTodo(data, id).subscribe((todo) => {
      this.store.update(id, todo);
      this.store.update(state => {
        const index = state.todo.findIndex(t => t.id === id);
        const todos = [...state.todo];
        todos[index] = todo;
        return {
          ...state,
          todo: todos
        };
      });
    });
  }

  deleteTodo(id: string) {
    this.todoApiService.deleteTodo(id).subscribe((res) => {
      if (res) {
        this.store.remove(id);
        this.store.update(state => {
          const updatedTodo = state.todo.filter(t => t.id !== id);
          return {
            ...state,
            todo: updatedTodo
          };
        });
      }
    });
  }
}
