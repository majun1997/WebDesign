import { AuthGuard } from './services/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  // Auth Components' routes
  {
    path: 'auth',
    loadChildren: './auth/auth.module#NgxAuthModule',
  },
  // Pages Components' routes - protected
  {
    path: 'pages',
    canActivate: [AuthGuard],
    loadChildren: './pages/pages.module#PagesModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
