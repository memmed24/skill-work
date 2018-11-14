import { SoundService } from './../services/sound.service';
import { CookieService } from 'ngx-cookie-service';
import { ConfigService } from './../../shared/config.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private _authSerivce: AuthService,
    private _router: Router,
    private cookieService: CookieService,
    private audioService: SoundService
  ) {
    this.registerForm = new FormGroup({
      passwort: new FormControl(''),
      benutzername: new FormControl(''),
      vorname: new FormControl(''),
      nachname: new FormControl('')
    });
  }

  ngOnInit() {

  }

  onSubmit() {
    if (this.registerForm.valid) {
      this._authSerivce.register(this.registerForm.value)
        .subscribe((data) => {
          if (data.status == 200) {
            this.audioService.success();
            Swal('You are all set', 'To continue please login', 'success');
            setTimeout(() => {
              this._router.navigate(['/login']);
            }, 1500);
          }
        }, error => {
          if (error.status == 409) {
            console.log('User is already exist');
          }
        });
    }
  }


}
