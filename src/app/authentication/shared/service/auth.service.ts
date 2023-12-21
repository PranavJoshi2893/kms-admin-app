import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authUrl = 'http://192.168.0.129:3000/api/v1'
  constructor(private _http: HttpClient) { }

  userLogin(user: any): Observable<any> {
    return this._http.post<any>(`${this._authUrl}/login`, user);
  }

  userRegister(user: any): Observable<any> {
    return this._http.post<any>(`${this._authUrl}/register`, user);
  }

}
