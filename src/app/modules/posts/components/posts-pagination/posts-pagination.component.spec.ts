import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsPaginationComponent } from './posts-pagination.component';

describe('PostsPaginationComponent', () => {
  let component: PostsPaginationComponent;
  let fixture: ComponentFixture<PostsPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostsPaginationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
