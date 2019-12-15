import { Member } from './../models/members';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { artwork } from '../models/artworkmodel';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const cors = {
  headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' })
}

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private memberUrl = `${environment.serverBaseURL}/members`;

  selectedMember: Member;

  constructor(private http: HttpClient) {
  }

  getMemberInfo(id: string): Observable<Member> {
    const url = `${this.memberUrl}/${id}`;
    return this.http.get<Member>(url)
    .pipe(
      catchError(this.handleError<Member>(`GetMemberInfo id=${id}`))
    );
  }

  updateProfile(member: Member): Observable<any> {
    const url = `${this.memberUrl}/update-profile`;
    return this.http.put(url, member, httpOptions)
    .pipe(
      catchError(this.handleError<any>('updateProfile'))
    );
  }
   addFollowing(author:Member):Observable<any>{
    const url = `${this.memberUrl}/follow`;
        console.log(author.id);   
    return this.http.post(url, author, cors) .pipe(
          catchError(this.handleError<any>('follow'))
        );
   }
   unFollowing(author:Member):Observable<any>{
    const url = `${this.memberUrl}/unfollow`;
        console.log(author.id);   
    return this.http.post(url, author, cors) .pipe(
          catchError(this.handleError<any>('unfollow'))
        );
   }
   setFavourite(artworks:artwork):Observable<any>{
    const url = `${this.memberUrl}/setfavourite`;
        console.log(artworks.id);   
    return this.http.post(url, artworks, cors) .pipe(
          catchError(this.handleError<any>('setfavourite'))
        );
   }
   unFavourite(artworks:artwork):Observable<any>{
    const url = `${this.memberUrl}/unfavourite`;
        console.log(artworks.id);   
    return this.http.post(url, artworks, cors) .pipe(
          catchError(this.handleError<any>('unfavourite'))
        );
   }
      /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
