import { Component, OnInit } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { Observable } from 'rxjs';
import {Contact} from './contact.model'

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ContactServices implements Contact{
  
  
  constructor(private http:HttpClient) { }
  
  public list():Observable<Array<Contact>>
  {
    const contact$=this.http.get<Contact[]>('assets/contact.json');
    return contact$;
  }
  }

}