import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginFormComponent} from './login-form/login-form.component';
import {UsersComponent} from './users/users.component';
import {AuthorizationGuard} from './services/authorization.guard';

const routes: Routes = [
  {path: 'users', component: UsersComponent, canActivate: [AuthorizationGuard]},
  {path: 'login', component: LoginFormComponent},
  {path: '**', redirectTo: 'login'},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
