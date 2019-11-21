import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TodoItem } from '../app.component';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {

  @Input()
  todo: TodoItem;

  @Output()
  delete = new EventEmitter<TodoItem>();
  update = new EventEmitter();

  doDelete() {
    this.delete.emit();
  }

  doUpdate() {
    this.update.emit();
  }
}
