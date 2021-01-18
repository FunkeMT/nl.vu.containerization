import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = "https://api.inventory-app.com";

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  public sendGetRequest() {
    console.log('Send Get Request:');
    return this.httpClient
      .get(this.REST_API_SERVER + '/inventory/books')
      .pipe(catchError(this.handleError));
  }

  public sendPostRequest(book: object) {
    console.log('Send Post Request:');
    return this.httpClient
      .post<any>(this.REST_API_SERVER + '/inventory/book/create', book)
      .pipe(catchError(this.handleError));
  }
}
