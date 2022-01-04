import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPost } from '../../../../core/models/post.model';

@Component({
  selector: 'posts-item',
  templateUrl: './posts-item.component.html',
  styleUrls: ['./posts-item.component.scss'],
})
export class PostsItemComponent implements OnInit {
  @Input()
  public post!: IPost;

  @Output()
  public remove: EventEmitter<IPost> = new EventEmitter<IPost>();

  constructor() {}

  ngOnInit(): void {}

  onDeletePost(): void {
    this.remove.emit(this.post);
  }
}
