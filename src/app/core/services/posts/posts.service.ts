import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { IPost } from '../../models/post.model';
import { IComment } from '../../models/comment.model';
import { Observable, catchError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private contextUrl = `${environment.apiUrl}/posts`;

  constructor(private httpClient: HttpClient) {}

  public getPosts(): Observable<IPost[]> {
    return this.httpClient
      .get<IPost[]>(`${this.contextUrl}`)
      .pipe(catchError(this.handleError));
  }

  public getPostById(id: number): Observable<IPost> {
    return this.httpClient
      .get<IPost>(`${this.contextUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  public getCommentsByPostId(postId: number): Observable<IComment[]> {
    return this.httpClient
      .get<IComment[]>(`${this.contextUrl}/${postId}/comments`)
      .pipe(catchError(this.handleError));
  }

  public createPost(payload: IPost): Observable<IPost> {
    return this.httpClient
      .post<IPost>(`${this.contextUrl}`, payload, httpOptions)
      .pipe(catchError(this.handleError));
  }

  public updatePost(payload: IPost): Observable<IPost> {
    return this.httpClient
      .put<IPost>(`${this.contextUrl}/${payload.id}`, payload, httpOptions)
      .pipe(catchError(this.handleError));
  }

  public deletePost(id: number): Observable<void> {
    return this.httpClient
      .delete<void>(`${this.contextUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknow error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => new Error(errorMessage));
    }

    switch (errorRes.error.error.message) {
      case 'TITLE_EXISTS':
        errorMessage = 'This title exists already';
        break;
      case 'INVALID_TITLE':
        errorMessage = 'This title is not valid.';
        break;
    }
    return throwError(() => new Error(errorMessage));
  }
}
