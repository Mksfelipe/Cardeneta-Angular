import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../models/account';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient) { }

  getAccounById(id: number): Observable<Account> {
    return this.httpClient.get<Account>(`${environment.API_URL}/account/${id}`)
  }
}
