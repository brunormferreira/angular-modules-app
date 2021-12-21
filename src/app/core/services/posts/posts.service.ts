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
  constructor(private httpClient: HttpClient) {}

  getPosts(): Observable<IPost[]> {
    return this.httpClient.get<IPost[]>(`${environment.apiUrl}/posts`);
  }

  getPostById(id: number): Observable<IPost> {
    return this.httpClient.get<IPost>(`${environment.apiUrl}/posts/${id}`);
  }

  getCommentsByPostId(postId: number): Observable<IComment[]> {
    return this.httpClient.get<IComment[]>(
      `${environment.apiUrl}/posts/${postId}/comments`
    );
  }

  createPost(payload: IPost): Observable<IPost> {
    return this.httpClient.post<IPost>(
      `${environment.apiUrl}/posts`,
      payload,
      httpOptions
    );
  }

  updatePost(payload: IPost): Observable<IPost> {
    return this.httpClient.put<IPost>(
      `${environment.apiUrl}/posts/${payload.id}`,
      payload,
      httpOptions
    );
  }

  deletePost(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/posts/${id}`);
  }
}
