import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostsDetailsComponent } from './containers/posts-details/posts-details.component';
import { PostsEditComponent } from './containers/posts-edit/posts-edit.component';
import { PostsListComponent } from './containers/posts-list/posts-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: PostsListComponent },
      { path: ':id/edit', component: PostsEditComponent },
      { path: ':id/details', component: PostsDetailsComponent },
    ],
  },
];

// The component to instantiate when the path matches. Can be
// empty if child routes specify components.

// const routes: Routes = [
//   {
//     path: '',
//     pathMatch: 'full',
//     component: PostsListComponent,
//   },
//   { path: ':id/edit', component: PostsEditComponent },
//   { path: ':id/details', component: PostsDetailsComponent },
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
