import { AuthService } from './../../services/auth.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit, OnChanges {

  @Input('userdata') userdata: Object;
  public username: string;
  contact_button: string;


  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    // this.buttonType();
  }

  buttonType(): void {
    if(this.userdata['isFriend'] == true) {
      this.contact_button = "Friend";
    }
    if(this.userdata['isFriendRequestSent']) {
      this.contact_button = "Cancel friend requests";
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['userdata'].currentValue['isFriend'] == true) {
      this.contact_button = "Unfriend";
    }
    if(changes['userdata'].currentValue['isFriendRequestSent'] == true) {
      this.contact_button = "Cancel";
    }
    if(!changes['userdata'].currentValue['isFriendRequestSent'] && !changes['userdata'].currentValue['isFriend']) {
      this.contact_button = "Add";
    }
  }

  contactClick(type: string): void {
    console.log(type);
    if(type == "Add") {
      this.contact_button = "Cancel"
    }else if(type == "Cancel") {
      this.contact_button = "Add"
    }else if(type == "Unfriend") {
      this.contact_button = "Add"
    }
  }

}
