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
  constructor(private HttpClient: HttpClient) {}

  getPosts(): Observable<IPost[]> {
    return this.HttpClient.get<IPost[]>(`${environment.apiUrl}/posts`);
  }

  getPostById(id: number): Observable<IPost> {
    return this.HttpClient.get<IPost>(`${environment.apiUrl}/posts/${id}`);
  }

  getCommentsByPostId(postId: number): Observable<IComment[]> {
    return this.HttpClient.get<IComment[]>(
      `${environment.apiUrl}/posts/${postId}/comments`
    );
  }

  createPost(payload: IPost): Observable<IPost> {
    return this.HttpClient.post<IPost>(
      `${environment.apiUrl}/posts`,
      payload,
      httpOptions
    );
  }

  updatePost(payload: IPost): Observable<IPost> {
    return this.HttpClient.put<IPost>(
      `${environment.apiUrl}/posts/${payload.id}`,
      payload,
      httpOptions
    );
  }

  deletePost(id: number): Observable<void> {
    return this.HttpClient.delete<void>(`${environment.apiUrl}/posts/${id}`);
  }
}