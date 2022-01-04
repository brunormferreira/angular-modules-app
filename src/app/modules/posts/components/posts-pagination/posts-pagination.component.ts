import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IPost } from '../../../../core/models/post.model';

@Component({
  selector: 'app-posts-pagination',
  templateUrl: './posts-pagination.component.html',
  styleUrls: ['./posts-pagination.component.scss'],
})
export class PostsPaginationComponent implements OnInit {
  @Input() currPage!: number;

  @Input() pageSize!: number;

  @Input() posts!: IPost[];

  @Output() nextPageChange = new EventEmitter();

  @Output() prevPageChange = new EventEmitter();

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
