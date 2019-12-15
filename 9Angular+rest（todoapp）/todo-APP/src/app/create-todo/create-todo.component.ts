import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,ReactiveFormsModule  } from '@angular/forms';
import {ListService} from '../services/list'
@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent implements OnInit {
  todo = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
    due:new FormControl('')
  });
  constructor(private listServices:ListService) { }

  ngOnInit() {
  }
  onSubmit() {
    
    // TODO: Use EventEmitter with form value
    
    this.listServices.post(this.todo.value).toPromise().then(todos=>{console.log(todos)});
    window.location.assign('');
  }
}
