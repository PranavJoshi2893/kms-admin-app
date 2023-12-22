import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authUrl = 'http://127.0.0.1:3000/api/v1'
  constructor(private _http: HttpClient) { }

  userLogin(user: any): Observable<any> {
    return this._http.post<any>(`${this._authUrl}/login`, user).pipe(catchError(this.handleError));
  }

  userRegister(user: any): Observable<any> {
    return this._http.post<any>(`${this._authUrl}/register`, user).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {

    let errorMessage = ""

    if (error.status === 0) {
      errorMessage = `An error occurred: ${error.statusText}`
    } else {
      errorMessage = `Backend returned code ${error.status}, body was: ${error.error.message}`
    }

    return throwError(() => {
      return errorMessage
    })
  }

}
