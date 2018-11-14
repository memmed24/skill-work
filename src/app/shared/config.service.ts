import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class ConfigService {

  private api_url: string = 'http://localhost:8000/api/';

  public authRoutes = {
    registerUrl: () => {
      return this.api_url + 'registrieren';
    },
    logoutUrl: () => {
      return this.api_url + 'logout' 
    }
  };

  public notificationsRoutes = {
    all: () => {
      return this.api_url + 'notification/'
    }
  };

  public profileRoutes = {
    get: () => {
      return `${this.api_url}profile`
    }
  };

  constructor() { }

  getApiUrl() {
    return this.api_url;
  }

  getRegisterUrl() {
    return this.api_url + 'registrieren';
  }

  getLoginUrl() {
    return this.api_url + 'login';
  }

  getLogoutUrl() {

  }


}