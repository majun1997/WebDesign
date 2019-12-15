import { AuthInterceptor } from './auth/auth.interceptor';
import { NbSidebarModule, NbMenuModule, NbToastrModule } from '@nebular/theme';
// basic
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// services
import { AuthGuard } from './services/auth-guard.service';

// styling related modules
import {  NbButtonModule,NbThemeModule, NbLayoutModule, NbUserModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

// sign-in related modules
import {NbPasswordAuthStrategy, NbAuthModule, NbAuthJWTToken,NbAuthService, NbTokenService, NbTokenStorage, NbTokenLocalStorage, NbAuthTokenParceler } from '@nebular/auth';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from './../environments/environment';



const formSetting: any = {
  redirectDelay: 0,
  showMessages: {
    success: true,
  },
};


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    // necessary modules
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    NbButtonModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          token: {
            class: NbAuthJWTToken,
            key: 'token',
          },
          // api paths
          baseEndpoint: `${environment.serverBaseURL}`,
          login: {
            endpoint: '/auth/login',
            method: 'post',
            redirect: {
              success: '/pages',
              failure: null, // stay on the same page
            },
          },
          register: {
            endpoint: '/auth/sign-up',
            method: 'post',
            redirect: {
              success: '/pages/profile',
              failure: null, // stay on the same page
            },
          },
          logout: {
            endpoint: '/auth/sign-out',
            method: 'post',
          },
          requestPass: {
            endpoint: '/auth/request-pass',
            method: 'post',
          },
          resetPass: {
            endpoint: '/auth/reset-pass',
            method: 'post',
          }
        }),
      ],
      forms: {
        login: formSetting,
        register: formSetting,
        requestPassword: formSetting,
        resetPassword: formSetting,
        logout: {
          redirectDelay: 500,
        },
      },
    }),
    // Nb components' modules
    NbThemeModule.forRoot({ name: 'default' }),
    NbSidebarModule.forRoot(),
    NbToastrModule.forRoot(),
    NbEvaIconsModule,
  ],
  providers: [
    NbAuthService,
    NbTokenService,
    NbAuthTokenParceler,
    { provide: NbTokenStorage, useClass: NbTokenLocalStorage },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthGuard,
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
