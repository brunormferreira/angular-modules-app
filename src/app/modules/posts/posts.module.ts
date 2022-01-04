import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PostsRoutingModule } from './posts-routing.module';

import { PostsItemComponent } from './components/posts-item/posts-item.component';

import { PostsListComponent } from './containers/posts-list/posts-list.component';
import { PostsFormComponent } from './containers/posts-form/posts-form.component';
import { PostsDetailsComponent } from './containers/posts-details/posts-details.component';

import { AlertModule } from 'src/app/shared/components/alert/alert.module';
import { SpinnerModule } from 'src/app/shared/components/spinner/spinner.module';
import { TruncatePipeModule } from 'src/app/shared/pipes/truncate/truncate.module';
import { PlaceholderModule } from 'src/app/shared/directives/placeholder.module';
import { PostsPaginationComponent } from './components/posts-pagination/posts-pagination.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    PostsListComponent,
    PostsFormComponent,
    PostsDetailsComponent,
    PostsItemComponent,
    PostsPaginationComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SpinnerModule,
    TruncatePipeModule,
    ReactiveFormsModule,
    AlertModule,
    PlaceholderModule,
  ],
})
export class PostsModule {}
