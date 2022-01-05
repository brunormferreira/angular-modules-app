import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IPost } from '../../../../core/models/post.model';
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
  public posts: IPost[] = [];
  public isLoading: boolean = true;

  public currPage: number = 1;
  public pageSize: number = 10;

  @ViewChild(PlaceholderDirective)
  private alertHost!: PlaceholderDirective;

  private closeSub!: Subscription;

  constructor(private postsService: PostsService, private router: Router) {}

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
          this.isLoading = false;
        },
      });
  }

  onPageChange(isNextPage?: boolean): number {
    if (!isNextPage) {
      return this.currPage--;
    }

    return this.currPage++;
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
        this.router.navigate(['/page-not-found'], {
          queryParams: { error: true },
        });
      });
    }
  }
}
