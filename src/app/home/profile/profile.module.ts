import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { CoverComponent } from './cover/cover.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule
  ],
  exports: [
    CoverComponent,
    ProfileInfoComponent
  ],
  declarations: [CoverComponent, ProfileInfoComponent]
})
export class ProfileModule { }