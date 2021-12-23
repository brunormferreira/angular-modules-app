import { Component, OnInit, ViewChild } from '@angular/core';
import { IPost } from '../../../../core/models/post.model';
import { IRoutes } from '../../../../core/models/routes.model';
import { PostsService } from '../../../../core/services/posts/posts.service';

import { tap, delay, Subscription } from 'rxjs';
import { PlaceholderDirective } from '../../../../shared/directives/placeholder.directive';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';

@Component({
  selector: 'posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit {
  posts: IPost[] = [];
  isLoading: boolean = true;

  @ViewChild(PlaceholderDirective)
  alertHost!: PlaceholderDirective;

  private closeSub!: Subscription;

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
      .subscribe({
        next: (posts: IPost[]) => (this.posts = posts),
        error: (errorMessage: string) => {
          this.showErrorAlert(errorMessage);
        },
      });
  }

  onDeletePost(post: IPost): void {
    const isValid = confirm(
      'Are you sure you want to delete this post?' + '\n' + post.title
    );

    if (isValid && post.id) {
      this.postsService
        .deletePost(post.id)
        .pipe(tap(() => console.log(':: DELETED POST ::', post)))
        .subscribe(() => alert('Post deleted with success!'));
    }
  }

  private showErrorAlert(message: string) {
    if (this.alertHost) {
      const hostViewContainerRef = this.alertHost.viewContainerRef;
      hostViewContainerRef.clear();

      const componentRef = hostViewContainerRef.createComponent(AlertComponent);

      componentRef.instance.message = message;
      this.closeSub = componentRef.instance.close.subscribe(() => {
        this.closeSub.unsubscribe();
        hostViewContainerRef.clear();
      });
    }
  }
}
