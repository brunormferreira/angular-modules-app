import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/core/models/post.model';
import { PostsService } from '../../../../core/services/posts/posts.service';

import { tap, delay } from 'rxjs';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit {
  posts: IPost[] = [];
  isLoading: boolean = true;

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
}
