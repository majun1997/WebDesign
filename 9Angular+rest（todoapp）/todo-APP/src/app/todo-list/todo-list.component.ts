import { Component, OnInit } from '@angular/core';
import { TodoList } from '../model/TodoList';
import {ListService} from '../services/list'
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos:Array<TodoList>
  constructor(private listServices:ListService) { }

  ngOnInit() {
    this.listServices.list().toPromise().then(todos=>{this.todos=todos;console.log(this.todos)});   
  }

} 
