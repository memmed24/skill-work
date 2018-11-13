import { ProfileComponent } from './profile.component';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";

const pRoutes: Routes = [
  {
    path: 'profile',
    children: [
      {
        path: '',
        component: ProfileComponent
      }
    ]
  }
];

export const ProfileRoutingModule: ModuleWithProviders = RouterModule.forRoot(pRoutes);