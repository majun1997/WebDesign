import { Component, OnInit } from '@angular/core';
import { TodoList } from '../model/TodoList';
import { ActivatedRoute } from '@angular/router';
import {ListService} from '../services/list'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  url:String;
  todos:Array<TodoList>
  
  constructor(private listServices:ListService ,private route: ActivatedRoute) { 
    
  }
  
  ngOnInit() {
    this.route.url.subscribe(url =>{this.url=url[0].toString()});
    
    this.listServices.get(this.url).toPromise().then(todos=>{this.todos=todos;console.log(todos)}); 
  }
  update(){
    console.log("update");
    //this.todo.content=document.getElementById("content").innerHTML;
    //this.todo.due=document.getElementById("due").innerHTML;
    //this.todo.title=document.getElementById("title").innerHTML;
    let due=document.getElementById("due").textContent;
    let title=document.getElementById("title").textContent;
    let content=document.getElementById("content").textContent;
    let createdata=document.getElementById("time").textContent;
    let todo={
      'due':`${due}`,
      'title':`${title}`,
      'content':`${content}`,
      'createdata':`${createdata}`,
    }
     
    this.listServices.update(this.url,todo).toPromise().then(re=>console.log(re));
    this.listServices.get(this.url).toPromise().then(todos=>{this.todos=todos;console.log(todos)}); 
    alert('Already Save in Mongodb');
  }
  delete(){
    var deleteUser = confirm('Are you absolutely sure you want to delete?');   
    if (deleteUser) {
      alert('Going to delete the user');
      this.listServices.delete(this.url).toPromise().then(()=>alert("successfully delete"))
    }
    window.location.assign('');
  }
}
