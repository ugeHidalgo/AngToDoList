import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoItem } from './app.component';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private readonly http: HttpClient) { }

  public get(): Promise<TodoItem[]> {
    return this.http
      .get(environment.apiUrl + '/todos')
      .pipe(map(x=> x as TodoItem[]))
      .toPromise();
  }

  public saveTodo(todo: TodoItem): Promise<TodoItem> {
    return this.http
      .post(environment.apiUrl + '/todo', todo)
      .pipe(map(x=> x as TodoItem))
      .toPromise();
  }

  public deleteTodo(id: string): Promise<any> {
    return this.http
      .delete(environment.apiUrl + '/todo/' + id )      
      .toPromise();
  }
}
