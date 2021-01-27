import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // DEFAULT
  //private REST_API_SERVER = "https://api.inventory-app.com";

  // HELM
  private REST_API_SERVER = "https://api.inventory-app-helm.com";
  
  // LOCAL DEV SERVER
  //private REST_API_SERVER = "http://localhost:5000";

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

  public sendGetDeleteRequest(bookId: number) {
    console.log('Send Get Delete Request:');
    return this.httpClient
      .get(this.REST_API_SERVER + '/inventory/book/delete/' + bookId)
      .pipe(catchError(this.handleError));
  }

  public sendPostCreateRequest(book: object) {
    console.log('Send Post Create Request:');
    return this.httpClient
      .post<any>(this.REST_API_SERVER + '/inventory/book/create', book)
      .pipe(catchError(this.handleError));
  }

  public sendPostUpdateRequest(book: object) {
    console.log('Send Post Update Request:');
    return this.httpClient
      .post<any>(this.REST_API_SERVER + '/inventory/book/update', book)
      .pipe(catchError(this.handleError));
  }
}
