import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { IPost } from 'src/app/core/models/post.model';
import { IComment } from 'src/app/core/models/comment.model';
import { PostsService } from '../../../../core/services/posts/posts.service';

import { tap, delay } from 'rxjs';
@Component({
  selector: 'posts-details',
  templateUrl: './posts-details.component.html',
  styleUrls: ['./posts-details.component.scss'],
})
export class PostsDetailsComponent implements OnInit {
  post!: IPost;
  comments!: IComment[];
  id!: number;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loadPostById();
    this.loadCommentsByPostId();
  }

  loadPostById(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.id = id;
    this.postsService
      .getPostById(id)
      .pipe(
        delay(1000),
        tap((posts: IPost) => {
          console.log(':: LOAD POST BY ID ::', posts);
          this.isLoading = false;
        })
      )
      .subscribe((post: IPost) => (this.post = post));
  }

  loadCommentsByPostId(): void {
    this.postsService
      .getCommentsByPostId(this.id)
      .pipe(
        delay(1000),
        tap((comments: IComment[]) => {
          console.log(':: LOAD COMMENTS BY POST ID ::', comments);
          this.isLoading = false;
        })
      )
      .subscribe((comments: IComment[]) => (this.comments = comments));
  }

  save(): void {
    if (this.post) {
      this.postsService
        .updatePost(this.post)
        .pipe(
          delay(1000),
          tap((post: IPost) => console.log(':: UPDATED POST ::', post))
        )
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }
}
