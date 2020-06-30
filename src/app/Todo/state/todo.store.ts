import {EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {Todo} from '../../models/todo';
import {Injectable} from '@angular/core';

export interface TodoState extends EntityState<Todo, string> {
  todo: Todo[];
}

export function createInitialState(): TodoState {
  return {
    todo: []
  };
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'todos' })
export class TodoStore extends EntityStore<TodoState> {
  constructor() {
    super(createInitialState());
  }
}
