import { AuthService } from './../../services/auth.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import Swal from 'sweetalert2';

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
    private authService: AuthService,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    // this.buttonType();
  }

  buttonType(): void {
    if (this.userdata['isFriend'] == true) {
      this.contact_button = "Friend";
    }
    if (this.userdata['isFriendRequestSent']) {
      this.contact_button = "Cancel friend requests";
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userdata'].currentValue['isFriend'] == true) {
      this.contact_button = "Unfriend";
    }
    if (changes['userdata'].currentValue['isFriendRequestSent'] == true) {
      this.contact_button = "Cancel";
    }
    if (
      !changes['userdata'].currentValue['isFriendRequestSent'] &&
      !changes['userdata'].currentValue['isFriend'] &&
      changes['userdata'].currentValue['isFriendRequestRecieved'] == false) {
      console.log(!changes['userdata'].currentValue['isFriendRequestRecieved']);
      this.contact_button = "Add";
    }
    if (changes['userdata'].currentValue['isFriendRequestRecieved']) {
      this.contact_button = "Respond";
    }
    // console.log(changes['userdata']);
  }

  contactClick(type: string): void {
    if (type == "Add") {
      this.sendRequest();
    } else if (type == "Cancel") {
      this.cancelRequest();
    } else if (type == "Unfriend") {
      this.contact_button = "Add"
    } else if (type == "Respond") {
      Swal({
        title: 'Respond to friend request',
        text: "",
        type: "question",
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Accept',
        cancelButtonText: "Remove"
      }).then((result) => {
        console.log(result)
        if (result.value) {
          Swal(
            'Accepted!',
            '',
            'success'
          )
        } else if(result.dismiss) {
          Swal(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    }
  }

  sendRequest(): void {
    this.profileService.sendFriendRequest(this.userdata['username'])
      .subscribe((data) => {
        this.contact_button = "Cancel";
      }, error => {
        this.handleError(error);
      });
  }

  cancelRequest(): void {
    this.profileService.cancelFriendRequest(this.userdata['username'])
      .subscribe((data) => {
        this.contact_button = "Add"
      }, error => {
        this.handleError(error);
      })
  }

  acceptRequest(): void {

  }

  handleError(error): void {
    Swal(`${error.status}`, `${error.json()['message']}`, 'error');
  }




}
