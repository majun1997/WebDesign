import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TodoListComponent} from './todo-list/todo-list.component'
import {CreateTodoComponent} from './create-todo/create-todo.component'
import {DetailComponent} from './detail/detail.component'
const routes: Routes = [
  
  {
    path:'',
    component:TodoListComponent
  },
  {
    path:'create',
    component:CreateTodoComponent
  },
  {
    path:':id',
    component:DetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
