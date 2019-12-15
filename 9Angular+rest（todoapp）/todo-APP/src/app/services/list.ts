import { Injectable } from '@angular/core';
import { TodoList } from '../model/TodoList';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  public list(): Observable<Array<TodoList>> {
    
    const todo$ = this.http.get<TodoList[]>('http://localhost:3000/list');
    
    return todo$;
  }
  public post(newtodo:JSON):Observable<Array<TodoList>> {
    
    let todo$ = this.http.post<TodoList[]>('http://localhost:3000/list',newtodo);
    return todo$;
    
  }
  public get(id:String):Observable<Array<TodoList>> {
    let todo$ = this.http.get<TodoList[]>('http://localhost:3000/list/'+id);
    return todo$;
  }
  public update(id:String,updateinfo:any){
    let todo$ = this.http.put<TodoList[]>('http://localhost:3000/list/'+id,updateinfo);
    return todo$;
  }
  public delete(id:String){
    let todo$ = this.http.delete<TodoList[]>('http://localhost:3000/list/'+id);
    return todo$;
  }
}