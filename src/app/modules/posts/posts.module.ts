import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsListComponent } from './containers/posts-list/posts-list.component';
import { PostsEditComponent } from './containers/posts-edit/posts-edit.component';
import { PostsDetailsComponent } from './containers/posts-details/posts-details.component';

@NgModule({
  declarations: [PostsListComponent, PostsEditComponent, PostsDetailsComponent],
  imports: [CommonModule, PostsRoutingModule],
})
export class PostsModule {}
