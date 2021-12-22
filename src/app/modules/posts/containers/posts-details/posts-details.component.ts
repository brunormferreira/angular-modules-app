import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { IPost } from 'src/app/core/models/post.model';
import { PostsService } from '../../../../core/services/posts/posts.service';

import { tap, delay } from 'rxjs';
@Component({
  selector: 'app-posts-details',
  templateUrl: './posts-details.component.html',
  styleUrls: ['./posts-details.component.scss'],
})
export class PostsDetailsComponent implements OnInit {
  post!: IPost;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loadPostById();
  }

  loadPostById(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.postsService
      .getPostById(id)
      .subscribe((post: IPost) => (this.post = post));
  }

  goBack(): void {
    this.location.back();
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
}
