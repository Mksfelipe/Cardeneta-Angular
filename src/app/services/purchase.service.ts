import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.';
import { Purchase } from '../models/purchased';
import { PurchaseInputValue } from '../models/purchasedInput';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private httpClient: HttpClient) { }

  getPurchaseByAccoundId(id: number, page: number): Observable<Purchase[]> {
    return this.httpClient.get<Purchase[]>(`${environment.API_URL}/account/${id}/purchase?page=${page}&sort=created,desc`)
  }

  createPurchase(id: number, value: PurchaseInputValue) {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(value);
    return this.httpClient.post(`${environment.API_URL}/account/${id}/purchase`, body, {'headers': headers}
    ) .pipe(retry(1), catchError(this.handleError));
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
