import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginComponent } from './login/login/login.component';

const routes: Routes = [
  { path: '', component: MenuComponent, canActivate: [AuthGuardService] },
  { path: 'dashboard', component: MenuComponent, canActivate: [AuthGuardService] },
  { path: 'menu', component: MenuComponent,  canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: '**', component: MenuComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
