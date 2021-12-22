import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsListComponent } from './containers/posts-list/posts-list.component';
import { PostsFormComponent } from './containers/posts-form/posts-form.component';
import { PostsDetailsComponent } from './containers/posts-details/posts-details.component';

import { SpinnerModule } from 'src/app/shared/components/spinner/spinner.module';
import { TruncatePipeModule } from 'src/app/shared/pipes/truncate/truncate.module';
import { PostsItemComponent } from './containers/posts-list/posts-item/posts-item.component';

@NgModule({
  declarations: [
    PostsListComponent,
    PostsFormComponent,
    PostsDetailsComponent,
    PostsItemComponent,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SpinnerModule,
    TruncatePipeModule,
    FormsModule,
  ],
})
export class PostsModule {}
