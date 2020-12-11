import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map, share, filter } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
// import { Post } from '../posts';
import { Post } from './posts';
@Injectable({
  providedIn: 'root'
})
export class DataManagementService {
  constructor(private http: HttpClient) { }

  getUserDetail(id: number) {
    return this.http.get('https://jsonplaceholder.typicode.com/users/' + id)
      .pipe(
        tap(User => console.log()),
        catchError(this.handleError('getUser', []))
      );
  }
  getUserPosts() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts/')
      .pipe(
        tap(post => console.log()),
        catchError(this.handleError('getUser', []))
      );
  }
  getUserComments() {
    return this.http.get('https://jsonplaceholder.typicode.com/comments')
      .pipe(
        tap(post => console.log()),
        catchError(this.handleError('getUser', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
