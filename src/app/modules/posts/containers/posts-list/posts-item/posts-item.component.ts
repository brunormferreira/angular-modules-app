import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IRoutes } from 'src/app/core/models/routes.model';
import { IPost } from '../../../../../core/models/post.model';

@Component({
  selector: 'posts-item',
  templateUrl: './posts-item.component.html',
  styleUrls: ['./posts-item.component.scss'],
})
export class PostsItemComponent implements OnInit {
  @Input() post!: IPost;

  @Input() routes!: Array<IRoutes>;

  @Output()
  remove: EventEmitter<IPost> = new EventEmitter<IPost>();

  constructor() {}

  ngOnInit(): void {}

  onDeletePost(): void {
    this.remove.emit(this.post);
  }
}
