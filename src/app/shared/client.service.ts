import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode  from 'jwt-decode';
import { lastValueFrom, map } from 'rxjs';
import { environment } from 'src/environments/environment.';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  result: any

  constructor(private http: HttpClient) { }

  async login(user: any) {
    const result$ = this.http.post<any>(`${environment.API_URL}/signin`, user);
    this.result = await lastValueFrom(result$);
    if (this.result) {
      window.localStorage.setItem('token', this.result.token);
      return true;
    }

    return false;
  }

  getAuthorizationToken() {
    const token = window.localStorage.getItem('token');
    return token;
  }

  getTokenExpirationDate(token: string): Date {
    const decoded: any = jwt_decode(token);

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }

  isUserLoggedIn() {
    const token = this.getAuthorizationToken();
    if (!token) {
      return false;
    } else if (this.isTokenExpired(token)) {
      return false;
    }

    return true;
  }
}
