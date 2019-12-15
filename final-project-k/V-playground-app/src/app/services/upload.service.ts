import { Image } from './../models/upload';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private imgUrl = `${environment.serverBaseURL}/upload_img`;
  private uploadArtworkPicUrl = `${environment.serverBaseURL}/upload_artworkPic`;

  uploadImg: Image;

  constructor(private http: HttpClient) {
  }

  uploadImage(img: Image): Observable<any> {
    return this.http.post(this.imgUrl, img)
    .pipe(
      catchError(this.handleError<any>('updateProfile'))
    );
  }

  uploadArtworkPic(img: Image): Observable<any> {
    return this.http.post(this.uploadArtworkPicUrl, img)
    .pipe(
      catchError(this.handleError<any>('updateArtworkPic'))
    );
  }
  delete(url:string){
    console.log(url)
    return this.http.delete(url);
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
