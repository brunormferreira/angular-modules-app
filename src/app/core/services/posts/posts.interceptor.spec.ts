import { TestBed } from '@angular/core/testing';

import { PostsInterceptor } from './posts.interceptor';

describe('PostsInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PostsInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: PostsInterceptor = TestBed.inject(PostsInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
