import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {Todo} from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {
  constructor(private apiService: ApiService) {
  }
  getTodos(): Observable<Todo[]> {
    return this.apiService.get<Todo[]>('/api/todo', {}, false);
  }

  addTodo(data: any): Observable<Todo> {
    return this.apiService.post<Todo>('/api/todo/create', data, false);
  }

  updateTodo(data: any, id: string): Observable<Todo> {
    return this.apiService.patch<Todo>(`/api/todo/update/${id}`, data, false);
  }

  deleteTodo(id: string): Observable<string> {
    return this.apiService.delete(`/api/todo/delete/${id}`, false);
  }
}
