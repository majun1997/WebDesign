import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ViewComponent} from './contact/view/view.component';
const routes: Routes = [{
  path:'contact',
  component:ViewComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
