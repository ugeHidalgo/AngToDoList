import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './ids-config';
import { TodosService } from './todos.service';

export interface TodoItem {
  id?: string;
  description: string;
  done: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {  
  @ViewChild('pepe', {static: true, read: NgForm})
  form: NgForm;

  description: string;
  private todos: TodoItem[] = [];
  todosScr: TodoItem[] = [];
  filterType: string;
  todosPromise: Promise<TodoItem[]>;
  loading = false;

  async ngOnInit() {
    this.loading= true;
    this.todos = await this.todosService.get();
    this.loading= false;
    this.applyFiltering();
  }

  constructor(
    private readonly oauthService: OAuthService, 
    private readonly todosService: TodosService
    ) {
    this.configure();
  }

  private configure() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndLogin();
  }

  async addItem(description: string) {
    const todo = await this.todosService.saveTodo({
      description,
      done: false
    });
    this.todos.push(todo);
    this.form.reset();
    this.applyFiltering();
  }

  async removeItem(todo: TodoItem) {
    await this.todosService.deleteTodo(todo.id);
    const position = this.todos.indexOf(todo);
    this.todos.splice(position,1);
    this.applyFiltering();
  }

  setAsDone(position: number) {
    this.todos[position].done= true;
    this.applyFiltering();
  }

  updateStatus(todo, value) {
    todo.done = value;
    this.applyFiltering();
  }

  filter(type: string) {
    this.filterType = type;
    this.applyFiltering();
  }

  applyFiltering() {
    this.todosScr = this.todos.filter(x=>this.filterItem(x));
  }

  filterItem(todo : TodoItem) {
    if (!this.filterType || this.filterType === 'all') {
      return true;
    }

    if (this.filterType === 'pending') {
      return !todo.done;
    }

    if (this.filterType === 'completed') {
      return todo.done;
    }
  }
}
