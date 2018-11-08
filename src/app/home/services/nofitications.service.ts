import { ConfigService } from './../../shared/config.service';
import { Http, Headers } from '@angular/http';
import { WebsocketsService } from './websockets.service';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class NofiticationsService {

  readonly notifications = {
    types: [
      {
        text: 'Has sent you friend request',
        icon: 'user'
      }
    ]
  };

  constructor(
    private http: Http,
    private config: ConfigService,
    private cookieService: CookieService
  ) { 
    
  }

  getAll(): Observable<any> {
    var headers = new Headers;
    let token = this.cookieService.get('api_token');
    headers.append('x-access-token', token)
    let options = {
      headers: headers
    }
    return this.http.get(this.config.notificationsRoutes.all(), options);
  }


}
