import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private cookiService: CookieService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  onClick(): void {
    this.authService.logout().subscribe((data) => {
      // console.log(data);
      if(data.status == 200) {
        this.cookiService.deleteAll();
        this.router.navigate(['/login']);
      }
    })
  }

}
