import {Component, OnInit} from '@angular/core';
import {Todo} from '../../models/todo';
import {Subscription} from 'rxjs';
import {NotificationService} from '../../services/notification.service';
import {TodoService} from '../state/todo.service';
import {TodoQuery} from '../state/todo.query';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: Todo[];
  todoSub: Subscription;

  constructor(private todoService: TodoService, private alert: NotificationService, private todoQuery: TodoQuery) {
  }

  ngOnInit() {
    this.todoService.storeTodo();
    // this.todoSub = this.todoQuery.select('todo').subscribe((res) => {
    //   this.todos = res;
    //   this._alert.success('Todos fetched Successfully');
    // });
    this.todoQuery.selectAll().subscribe((res) => {
      this.todos = res;
      this.alert.success('Todos fetched Successfully');
    });
  }

  onDelete(id: string) {
    this.todoService.deleteTodo(id);
  }
}
