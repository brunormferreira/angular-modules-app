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
import { throwError, tap } from 'rxjs';
import { MessageService } from '../messages/messages.service';

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

  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService
  ) {}

  public getPosts(): Observable<IPost[]> {
    return this.httpClient.get<IPost[]>(`${this.contextUrl}`).pipe(
      tap((_) => this.log('fetched posts')),
      catchError(this.handleError)
    );
  }

  public getPostById(id: number): Observable<IPost> {
    return this.httpClient.get<IPost>(`${this.contextUrl}/${id}`).pipe(
      tap((_) => this.log(`fetched post id=${id}`)),
      catchError(this.handleError)
    );
  }

  public getCommentsByPostId(postId: number): Observable<IComment[]> {
    return this.httpClient
      .get<IComment[]>(`${this.contextUrl}/${postId}/comments`)
      .pipe(
        tap((_) => this.log(`fetched comments by post id=${postId}`)),
        catchError(this.handleError)
      );
  }

  public createPost(payload: IPost): Observable<IPost> {
    return this.httpClient
      .post<IPost>(`${this.contextUrl}`, payload, httpOptions)
      .pipe(
        tap((newPost: IPost) => this.log(`added new post id=${newPost.id}`)),
        catchError(this.handleError)
      );
  }

  public updatePost(payload: IPost): Observable<IPost> {
    return this.httpClient
      .put<IPost>(`${this.contextUrl}/${payload.id}`, payload, httpOptions)
      .pipe(
        tap((_) => this.log(`updated post id=${payload.id}`)),
        catchError(this.handleError)
      );
  }

  public deletePost(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.contextUrl}/${id}`).pipe(
      tap((_) => this.log(`deleted post id=${id}`)),
      catchError(this.handleError)
    );
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

  private log(message: string) {
    this.messageService.add(`PostsService: ${message}`);
  }
}
