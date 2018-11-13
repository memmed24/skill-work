import { AuthGuard } from './../guards/auth.guard';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'profile', loadChildren: './profile/profile.module#ProfileModule'
  }
];

export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);