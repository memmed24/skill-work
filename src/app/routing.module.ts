import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '', loadChildren: './home/home.module#HomeModule'
  }
];

export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);