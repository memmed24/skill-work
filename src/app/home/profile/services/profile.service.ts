import { CookieService } from 'ngx-cookie-service';
import { ConfigService } from './../../../shared/config.service';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: Http,
    private config: ConfigService,
    private cookie: CookieService
  ) { }

  sendFriendRequest(username: string): Observable<any> {
    var headers = new Headers();
    let token = this.cookie.get('api_token');
    headers.append('x-access-token', token);
    return this.http.post(this.config.profileRoutes.sendRequest(username), {}, {
      headers: headers
    });
  }

  cancelFriendRequest(username: string): Observable<any> {
    var headers = new Headers();
    let token = this.cookie.get('api_token');
    headers.append('x-access-token', token);
    return this.http.post(this.config.profileRoutes.cancelRequest(username), {}, {
      headers: headers
    });
  }

  getProfile(username?: string): Observable<any> {
    let token = this.cookie.get('api_token');
    let headers = new Headers();
    headers.append('x-access-token', token);
    return this.http.get(this.config.profileRoutes.get(username), {
      headers: headers
    });
  }

}
