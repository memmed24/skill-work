import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from './services/profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public profile: Object = [];
  private username: string = null;
  public userdata: Object = {
    name: "",
    surname: "",
    username: "",
    authprofile: false,
    isFriend: false,
    isFriendRequestSent: false
  }

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.username = params['username'];
      if(this.username)
        this.getProfile(this.username);
      else
        this.getProfile();

    });
  }

  getProfile(username?: string): void {
    this.profileService.getProfile(username !== undefined ? username: null).subscribe((data) => {
      data = data.json();
      console.log(data);
      this.profile = data['user'];
      this.profile['ifFriendRequestSent'] = data['ifFriendRequestSent'];
      this.profile['isFriendRequestRecieved'] = data['isFriendRequestRecieved'];

      if(this.profile['friends'].length != 0) {
        this.profile['isFriend'] = false;
        this.profile['friends'].forEach((friend) => {
          if(friend.username == this.cookieService.get('username')) {
            this.profile['isFriend'] = true;
          }
        });
      }else {
        this.profile['isFriend'] = false;
      }
      
      this.userdata = {
        name: this.profile['name'],
        surname: this.profile['surname'],
        username: this.profile['username'],
        authprofile: this.authService.checkIfUserIsAuthed(this.profile['username']),
        isFriend: this.profile['isFriend'],
        isFriendRequestSent: this.profile['ifFriendRequestSent'],
        isFriendRequestRecieved: this.profile['isFriendRequestRecieved']
      }
    });
  }

}
