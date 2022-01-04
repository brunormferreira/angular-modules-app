import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsItemComponent } from './posts-item.component';

describe('PostsItemComponent', () => {
  let component: PostsItemComponent;
  let fixture: ComponentFixture<PostsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
