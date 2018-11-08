import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from './home-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
  imports: [
    CommonModule,
    RoutingModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    NotificationsComponent],
  exports: [
    LogoutComponent,
    NotificationsComponent
  ]

})
export class HomeModule { }
