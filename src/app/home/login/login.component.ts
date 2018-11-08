import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private _authService: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) { 
    this.loginForm = new FormGroup({
      benutzername: new FormControl(''),
      passwort: new FormControl('')
    })
  }

  ngOnInit() {
  }

  onSubmit(){
    if(this.loginForm.valid) {
      this._authService.login(this.loginForm.value).subscribe((data) => {
        let response = data.json();
        if(data.status == 200 && response['auth'] == true) {
          data = data.json();
          this.cookieService.set('api_token', data['token']);
          this.router.navigate(['/']);
        }else{
          alert(data.status);
        }
      })
    }
  }

}
