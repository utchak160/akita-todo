import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Todo} from '../../models/todo';
import {TodoService} from '../state/todo.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {

  form: FormGroup;
  constructor(private todoService: TodoService, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      description: new FormControl(null, {validators: [Validators.required]}),
      completed: new FormControl(null, {validators: [Validators.required]})
    });
  }

  onSubmit() {
    const todo: Todo = {
      title: this.form.value.title,
      description: this.form.value.description,
      completed: this.form.value.completed
    };
    this.todoService.createTodo(todo);
    this.form.reset();
    this.router.navigate(['/list']);
  }
}
