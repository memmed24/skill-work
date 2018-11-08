import { CookieService } from 'ngx-cookie-service';
import { ConfigService } from './../../shared/config.service';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private headers: Headers;

  constructor(
    private http: Http,
    private config: ConfigService,
    private cookieService: CookieService
  ) {
    this.headers = new Headers();
  }

  login(data: any): Observable<any> {
    return this.http.post(this.config.getLoginUrl(), data);
  }

  register(data: any): Observable<any> {
    return this.http.post(this.config.getRegisterUrl(), data);
  }

  logout(): Observable<any> {
    var header = new Headers();
    let token = this.cookieService.get('api_token');
    header.append('x-access-token', token)
    let options = {
      headers: header
    };
    return this.http.post(this.config.authRoutes.logoutUrl(), {}, options);
  }

  isLogged(): boolean {
    return this.cookieService.check('api_token');
  }

}
