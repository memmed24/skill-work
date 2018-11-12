import { SoundService } from './../services/sound.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

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
    private cookieService: CookieService,
    private audioService: SoundService
  ) {
    this.loginForm = new FormGroup({
      benutzername: new FormControl(''),
      passwort: new FormControl('')
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this._authService.login(this.loginForm.value).subscribe((data) => {
        const toast = (Swal as any).mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });
        toast({
          type: 'success',
          title: 'Signed in successfully'
        });
        let response = data.json();
        if (data.status == 200 && response['auth'] == true) {
          data = data.json();
          this.cookieService.set('api_token', data['token']);
          this.router.navigate(['/']);
        }
      }, error => {
        let status = error.status;
        error = error.json();
        this.audioService.error();
        switch (status) {
          case 401:
            Swal('Something went wrong', error['message'], 'error');
            break;
          case 404:
            Swal('Something went wrong', error['message'], 'error');
            break;
        }

      })
    }
  }

}
