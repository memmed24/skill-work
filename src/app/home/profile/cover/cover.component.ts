import { AuthService } from './../../services/auth.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css']
})
export class CoverComponent implements OnInit {

  @Input('userdata') userdata: Object;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

 

}
