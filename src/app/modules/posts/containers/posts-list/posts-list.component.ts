import { Component, OnInit } from '@angular/core';
import { IPost } from '../../../../core/models/post.model';
import { IRoutes } from '../../../../core/models/routes.model';
import { PostsService } from '../../../../core/services/posts/posts.service';

import { tap, delay } from 'rxjs';

@Component({
  selector: 'posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit {
  posts: IPost[] = [];
  isLoading: boolean = true;

  routesValue: IRoutes[] = [
    {
      path: 'details',
      sourcePath: '/posts',
      title: '➝ Details',
    },
    { path: 'edit', sourcePath: '/posts', title: '➝ Edit' },
  ];

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsService
      .getPosts()
      .pipe(
        delay(1000),
        tap(() => (this.isLoading = false))
      )
      .subscribe((posts: IPost[]) => (this.posts = posts));
  }

  onDeletePost(post: IPost): void {
    const isValid = confirm(
      'Are you sure you want to delete this post?' + '\n' + post.title
    );

    if (isValid) {
      this.postsService
        .deletePost(post.id)
        .pipe(tap(() => console.log(':: DELETED POST ::', post)))
        .subscribe(() => alert('Post deleted with success!'));
    }
  }
}
