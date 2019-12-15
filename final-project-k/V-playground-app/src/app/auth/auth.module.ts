//import { PagesModule } from './../pages/pages.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbAuthModule } from '@nebular/auth';
import { environment } from '../../environments/environment';


import { NgxAuthRoutingModule } from './auth-routing.module';
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule
} from '@nebular/theme';

/**
 *
 *
 * @export
 * @class NgxAuthModule
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxAuthRoutingModule,
    //PagesModule,
    NbAuthModule,
  ],
  declarations: [

  ],
})
export class NgxAuthModule {
}
