import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IPost } from '../../models/post.model';
import { IComment } from '../../models/comment.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

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
    return this.httpClient.get<IPost[]>(`${this.contextUrl}`);
  }

  public getPostById(id: number): Observable<IPost> {
    return this.httpClient.get<IPost>(`${this.contextUrl}/${id}`);
  }

  public getCommentsByPostId(postId: number): Observable<IComment[]> {
    return this.httpClient.get<IComment[]>(
      `${this.contextUrl}/${postId}/comments`
    );
  }

  public createPost(payload: IPost): Observable<IPost> {
    return this.httpClient.post<IPost>(
      `${this.contextUrl}`,
      payload,
      httpOptions
    );
  }

  public updatePost(payload: IPost): Observable<IPost> {
    return this.httpClient.put<IPost>(
      `${this.contextUrl}/${payload.id}`,
      payload,
      httpOptions
    );
  }

  public deletePost(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.contextUrl}/${id}`);
  }
}
