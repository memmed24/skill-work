import { AuthService } from './../../services/auth.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit,OnChanges {

  @Input('userdata') userdata: Object;
  public username: string;
  
  contact_methods: boolean = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changed: SimpleChanges): void {
    this.contact_methods = !this.authService.checkIfUserIsAuthed(changed['userdata'].currentValue['username']);
  }

}
