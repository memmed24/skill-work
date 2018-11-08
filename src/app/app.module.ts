import { ConfigService } from './shared/config.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { CookieService } from 'ngx-cookie-service';
import { RoutingModule } from './routing.module';
import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    RoutingModule,
    HomeModule,
    AngularFontAwesomeModule
  ],
  providers: [
    CookieService,
    ConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
   
}
