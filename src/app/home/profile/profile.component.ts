import { Component, OnInit } from '@angular/core';
import { ProfileService } from './services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public profile: Object = [];
  public userdata: Object = {
    name: "",
    surname: "",
    username: ""
  }

  constructor(
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile(): void {
    this.profileService.getProfile().subscribe((data) => {
      this.profile = data.json();
      this.userdata = {
        name: this.profile['name'],
        surname: this.profile['surname'],
        username: this.profile['username']
      }
    })
  }

}
