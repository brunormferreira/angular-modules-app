import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../../../core/services/posts/posts.service';
import { IPost } from '../../../../core/models/post.model';

@Component({
  selector: 'posts-form',
  templateUrl: './posts-form.component.html',
  styleUrls: ['./posts-form.component.scss'],
})
export class PostsFormComponent implements OnInit {
  public form: FormGroup;
  public title: string = '';

  private hasId: boolean = false;
  private id!: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {
    this.form = this.fb.group({
      title: [
        '',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(60),
          Validators.required,
        ]),
      ],
      body: [
        '',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(300),
          Validators.required,
        ]),
      ],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.title = this.id ? 'Edit Post' : 'New Post';
      this.hasId = !!this.id;

      if (!this.id) {
        return;
      }

      this.postsService.getPostById(this.id).subscribe({
        next: (post: IPost) => {
          this.form.patchValue(post);
          console.log(':: RETRIEVE POST BY ID ::', post);
        },
        error: (response: Response) => {
          if (response.status == 404) {
            this.router.navigate(['/page-not-found']);
          }
        },
      });
    });
  }

  get formValues(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmitForm(): void {
    if (this.form.invalid) {
      return;
    }

    const payload: IPost = {
      title: this.formValues['title'].value,
      body: this.formValues['body'].value,
    };

    if (this.hasId) {
      payload.id = this.id;
    }

    this.router.url.includes('new')
      ? this.onCreateNewPost(payload)
      : this.onUpdatePost(payload);
  }

  onCreateNewPost(post: IPost) {
    this.postsService.createPost(post).subscribe((post: IPost) => {
      this.onFinishFormProccess('SAVED', post);
    });
  }

  onUpdatePost(post: IPost) {
    this.postsService.updatePost(post).subscribe((post: IPost) => {
      this.onFinishFormProccess('UPDATED', post);
    });
  }

  onFinishFormProccess(proccess: string, post: IPost) {
    console.log(':: ' + proccess + ' POST ::', post);
    this.form.markAsPristine();
    this.form.reset();
    this.router.navigate(['/posts']);
  }
}
