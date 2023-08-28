import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.';
import { Client } from '../models/client';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private clientsSubject = new BehaviorSubject<Client[]>([]);
  clients$ = this.clientsSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  getClients(page: number): Observable<Client[]> {
    return this.httpClient.get<Client[]>(`${environment.API_URL}/client?page=${page}`);
  }

  saveClient(client: Client): Observable<Client> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(client);
    return this.httpClient.post<Client>(`${environment.API_URL}/client`, body, { 'headers': headers })
      .pipe(retry(1), catchError(this.handleError));
  }

  searchByName(fullName: string, page: number): Observable<Client[]> {
    fullName = fullName.toUpperCase();
    return this.httpClient.get<Client[]>(`${environment.API_URL}/client/search-by-name?fullName=${fullName}&page=${page}`);
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
