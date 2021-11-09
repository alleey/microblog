import { Location } from '@angular/common';
import { Component, Inject, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ViewModelHolder } from 'utils';
import { PostsServiceConfig, PostsServiceConfigToken } from '../../config/config';
import { BlogPostResponseModel } from '../../models/blog-post';
import { TopicModel } from '../../models/topic';
import { PostsService } from '../../services/posts.service';
import { uniqueSlugValidator } from '../../validators/unique-slug-validator';
import { TopicSelectorComponent } from '../topic-selector/topic-selector.component';

function slugify(text: string) {
  const from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;"
  const to = "aaaaaeeeeeiiiiooooouuuunc------"

  const newText = text.split('').map(
    (letter, i) => letter.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i)))

  return newText
    .toString()                     // Cast to string
    .toLowerCase()                  // Convert the string to lowercase letters
    .trim()                         // Remove whitespace from both sides of a string
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/&/g, '-y-')           // Replace & with 'and'
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-');        // Replace multiple - with single -
}

@Component({
  selector: 'blog-post-editor',
  templateUrl: './blog-post-editor.component.html',
  styleUrls: ['./blog-post-editor.component.scss']
})
export class BlogPostEditorComponent implements OnInit, OnDestroy {

  @Input("postId") paramPostId?: number;
  @Input() updateMode: boolean = true;

  @Input() headerTemplate: TemplateRef<any> | undefined;

  @ViewChild('topicSelector') topicSelector!: TopicSelectorComponent;

  postId?: number;
  form!: FormGroup;
  viewModel = new ViewModelHolder<BlogPostResponseModel>();
  destroyed$ = new Subject();

  constructor(
    @Inject(PostsServiceConfigToken) private config: PostsServiceConfig,
    private service: PostsService, 
    private location: Location,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {

    this.form = new FormGroup(
    {
      "title": new FormControl("", [
          Validators.required,
          Validators.maxLength(this.config.maxTitleLength),
        ]),
      "slug": new FormControl("", [
          Validators.required,
          Validators.maxLength(this.config.maxTitleLength),
          Validators.pattern(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/)
        ], 
        uniqueSlugValidator(this.service)
      ),
      "text": new FormControl("", [
          Validators.required, 
          Validators.maxLength(this.config.maxContentLength)
        ]),
    });

    this.title?.valueChanges.subscribe(val => {
      if(!this.slug?.touched || !this.slug?.value) {
        this.generateSlug();
      }
    });

    this.activatedRoute.paramMap.subscribe(params => {
      this.postId = <number> (params.get("postId") ?? this.paramPostId);
      if(this.isUpdateMode)
        this.fetchPost(this.postId!);
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  get isUpdateMode(): boolean { 
    return this.updateMode && this.postId !== undefined; 
  }
  get title() { return this.form.get('title'); }
  get slug() { return this.form.get('slug'); }
  get text() { return this.form.get('text'); }

  get post(): BlogPostResponseModel|undefined { return this.viewModel.Model; }
  get postTopics(): TopicModel[] { return this.post?.topics || []; }
  get topicsSelection(): number[] {
    return this.topicSelector.selectedTopics.map(i => i.id);
  }

  generateSlug(): void {
    this.slug?.setValue(slugify(this.title?.value));
  }

  updateForm(item: BlogPostResponseModel): void {
    if(this.isUpdateMode) {
      this.postId = item.id;
      this.title!.setValue (item.title);
      this.slug!.setValue (item.slug);
      this.text!.setValue (item.text);
    } 
    else 
    {
    }
  }

  fetchPost(id: number): void {
    this.service
      .one("", id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(this.viewModel.expectModel({
        nextObserver: {
          next: (i: BlogPostResponseModel) => this.updateForm(i)
        }
      }));
  }      

  createNewPost(): void {
    this.service
      .create("", this.slug?.value, this.title?.value, this.text?.value)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        this.viewModel.expectModel({
          deferReset: true, // because we are going to chain assignTopics, the loading flag shouldnt be reset now
          nextObserver: {
            next: (i: BlogPostResponseModel) => this.assignTopics(i, this.topicsSelection)
          }
        })
      );
  }

  updatePost(): void {
    this.service
      .update("", this.postId!, this.slug?.value, this.title?.value, this.text?.value)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        this.viewModel.expectNothing({
          deferReset: true,
          nextObserver: {
            next: () => this.assignTopics(this.viewModel.Model!, this.topicsSelection)
          }
        })
      );
  }

  assignTopics(post: BlogPostResponseModel, selectedTopics: number[]): void {
    this.service
      .assignTopics("", post.id, selectedTopics)
      .subscribe(
        this.viewModel.expectNothing({
          nextObserver: {
            next: () => this.updateForm(post)
          }
        })
      );
  }

  cancel(): void {
    this.location.back();
  }
}
