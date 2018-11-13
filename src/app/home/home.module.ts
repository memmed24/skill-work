import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from './home-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProfileComponent } from './profile/profile.component';
import { HeaderComponent } from './header/header.component';
import { ProfileModule } from './profile/profile.module';

@NgModule({
  imports: [
    CommonModule,
    RoutingModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    ProfileModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    NotificationsComponent,
    ProfileComponent,
    HeaderComponent],
  exports: [
    LogoutComponent,
    NotificationsComponent, 
    ProfileComponent,
    HeaderComponent
  ]

})
export class HomeModule { }
