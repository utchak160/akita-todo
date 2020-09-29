import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Todo} from '../../models/todo';
import {TodoService} from '../state/todo.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent implements OnInit {

  form: FormGroup;
  private mode = 'create';
  private id: string;
  private todo: Todo;

  constructor(private todoService: TodoService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      description: new FormControl(null, {validators: [Validators.required]}),
      completed: new FormControl(null, {validators: [Validators.required]})
    });
    this.todoService.storeTodo();
    this.route.paramMap.subscribe((param: ParamMap) => {
      if (param.has('id')) {
        this.mode = 'edit';
        this.id = param.get('id');
        this.todoService.getTodoById(this.id).subscribe((res) => {
          console.log(res);
          this.todo = res;
          this.form.setValue({
            title: this.todo.title,
            description: this.todo.description,
            completed: this.todo.completed
          });
        });
      } else {
        this.mode = 'create';
      }
    });
  }

  onSubmit() {
    const todo: Todo = {
      title: this.form.value.title,
      description: this.form.value.description,
      completed: this.form.value.completed
    };
    if (this.mode === 'create') {
      this.todoService.createTodo(todo);
    } else if (this.mode === 'edit') {
      this.todoService.updateTodo(todo, this.id);
    }
    this.form.reset();
    this.router.navigate(['/list']);
  }
}
