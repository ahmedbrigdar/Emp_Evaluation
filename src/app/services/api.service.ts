import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { user } from '../models/user';
import { Observable, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { evaluatedUser } from '../models/evaluatedUser';
import { evaluate } from '../models/evaluate';

const localUrl = 'http://localhost:30822/api/';


const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
    })
};


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getToken(email, password): Observable<any> {
    const params = { Email: email, Password: password }

    return this.http.post(localUrl + 'user/token', JSON.stringify(params), httpOptions).pipe(
      retry(3), catchError(this.handleError('getToken', [])));
  }
  getusers(): Observable<any> {
    return this.http.get<user[]>(localUrl + 'employees/all', httpOptions).pipe(
      retry(3), catchError(this.handleError<user[]>('getuser', [])));
  }
  getuserById(id: any): Observable<any> {
    return this.http.get<user>(localUrl + 'employees/get?id=' + id).pipe(
      retry(3), catchError(this.handleError<user>('getuser')));
  }
  adduser(user: user): Observable<any> {
    return this.http.post(localUrl + 'user/register', user, httpOptions)
      .pipe(
        retry(0), catchError(this.handleError('adduser', []))
      );
  }
  updateuser(user: user): Observable<any> {
    return this.http.post(localUrl + 'user/update', user, httpOptions)
      .pipe(
        catchError(this.handleError('updateuser', []))
      );
  }
  deleteuser(id): Observable<any> {
    return this.http.post(localUrl + 'user/delete?Id=' + id, httpOptions)
      .pipe(
        catchError(this.handleError('deleteuser', []))
      );
  }
  getEvaluation(id): Observable<any> {
    return this.http.get<evaluatedUser>(localUrl + 'employees/getEvaluation?Id=' + id, httpOptions)
      .pipe(
        catchError(this.handleError('getEvaluation',[]))
      );
  }
  addEvaluation(evaluation: evaluate): Observable<any> {
    return this.http.post(localUrl + 'employees/addEvaluation', evaluation, httpOptions)
      .pipe(
        retry(0), catchError(this.handleError('addEvaluation', []))
      );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
