import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IPost } from '../../../../core/models/post.model';

@Component({
  selector: 'app-posts-pagination',
  templateUrl: './posts-pagination.component.html',
  styleUrls: ['./posts-pagination.component.scss'],
})
export class PostsPaginationComponent implements OnInit {
  @Input()
  public currPage!: number;

  @Input()
  public pageSize!: number;

  @Input()
  public posts!: IPost[];

  @Output()
  public nextPageChange = new EventEmitter();

  @Output()
  public prevPageChange = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  pageCount() {
    if (!this.posts) return;

    const numberOfPages = Math.ceil(this.posts?.length / this.pageSize);

    return numberOfPages;
  }

  onChangePage(isNextPage?: boolean): void {
    if (!isNextPage) {
      return this.prevPageChange.emit();
    }

    this.nextPageChange.emit();
  }
}
