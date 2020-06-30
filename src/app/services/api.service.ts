import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Constants} from '../utils/constants';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  get<T>(endPoint: string, params?: any, authHeader?: boolean): Observable<T> {
    const option = {
      headers: this._getHeader(authHeader),
      params
    };
    return this.http.get<T>(this.baseUrl + endPoint, option)
      .pipe(
        map(res => res),
        catchError(err => of(err))
      );
  }

  post<T>(endPoint: string, data: any, authHeader?: boolean): Observable<T> {
    const option = {
      headers: this._getHeader(authHeader)
    };
    return this.http.post<T>(this.baseUrl + endPoint, data, option)
      .pipe(
        map(res => res),
        catchError(err => of(err))
      );
  }

  patch<T>(endPoint: string, data: any, autHeader?: boolean): Observable<T> {
    const option = {
      headers: this._getHeader(autHeader)
    };
    return this.http.patch<T>(this.baseUrl + endPoint, data, option)
      .pipe(
        map(res => res),
        catchError(err => of(err))
      );
  }

  delete<T>(endPoint: string, authHeader?: boolean): Observable<T> {
    const option = {
      headers: this._getHeader(authHeader)
    };
    return this.http.delete<T>(this.baseUrl + endPoint, option)
      .pipe(
        map(res => res),
        catchError(err => of(err))
      );
  }

  private _getHeader(authHeader): HttpHeaders {
    if (authHeader) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(Constants.AUTH_TOKEN)}`
      });
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }
}
