import { Location } from '@angular/common';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPostModel, BlogPostResponseModel } from '../../models/blog-post';
import { TopicModel } from '../../models/topic';
import { PostsService } from '../../services/posts.service';
import { TopicsService } from '../../services/topics.service';
import { uniqueSlugValidator } from '../../validators/unique-slug-validator.directive';
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
export class BlogPostEditorComponent implements OnInit {

  @Input() headerTemplate: TemplateRef<any> | undefined;

  postId?: number;
  post : BlogPostModel|null = null;

  successDesc: any = "";
  errorDesc: any = "";
  loading: boolean = false;

  form!: FormGroup;

  @ViewChild('topicSelector')
  topicSelector!: TopicSelectorComponent;

  constructor(
    private postService: PostsService, 
    private topicService: TopicsService,
    private router: Router, 
    private location: Location,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {

    this.form = new FormGroup(
    {
      "title": new FormControl("", Validators.required),
      "slug": new FormControl("", [
          Validators.required,
          Validators.pattern(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/)
        ], 
        uniqueSlugValidator(this.postService)
      ),
      "text": new FormControl("", Validators.required),
    });

    this.title?.valueChanges.subscribe(val => {
      if(!this.slug?.touched || !this.slug?.value) {
        this.generateSlug();
      }
    });

    this.activatedRoute.params.subscribe(params => {
      this.postId = params.postId;
      if(this.isUpdateMode)
        this.fetchPost(this.postId!);
    });
  }

  get isUpdateMode(): boolean { return this.postId !== undefined; }
  get title() { return this.form.get('title'); }
  get slug() { return this.form.get('slug'); }
  get text() { return this.form.get('text'); }

  get selectedTopics(): TopicModel[] {
    return this.post?.topics || [];
  }

  set blogPost(item: BlogPostModel) {
    this.post = item;
    this.postId = this.post?.id;
    console.info("Got post id: " + this.postId!);
  }

  generateSlug(): void {
    this.slug?.setValue(slugify(this.title?.value));
  }

  updateForm(): void {
    this.title!.setValue (this.post?.title);
    this.slug!.setValue (this.post?.slug);
    this.text!.setValue (this.post?.text);
  }

  fetchResponseHandler = {
    next: (result: BlogPostResponseModel) => {
      this.blogPost = result;
      this.updateForm();
      this.loading = false;
    },
    error: (err: any) => {
      this.errorDesc = err.message;
      this.loading = false;
      return false;
    }
  };

  fetchPost(postId: number): void {
    this.loading = true;
    this.postService
      .one("posts", postId)
      .subscribe(this.fetchResponseHandler);
  }      

  updateResponseHandler = {
    next: (result: BlogPostResponseModel) => {
      this.blogPost = result;
      this.assignTopics();
    },
    error: (err: any) => {
      this.errorDesc = err.message;
      this.loading = false;
      return false;
    }
  };

  createNewPost(): void {
    this.postService
      .create("posts", this.slug?.value, this.title?.value, this.text?.value)
      .subscribe(this.updateResponseHandler);
  }

  updatePost(): void {
    this.postService
      .update("posts", this.postId!, this.slug?.value, this.title?.value, this.text?.value)
      .subscribe(this.updateResponseHandler);
  }

  assignTopics(): void {
    const selectedTopics = this.topicSelector.selectedTopics.map(i => i.id);
    console.info(selectedTopics);
    this.postService
      .assignTopics("posts", this.postId!, selectedTopics)
      .subscribe({
        next: () => {
          this.updateForm();
          this.successDesc = "Post updated successfully!";
          this.loading = false;
        },
        error: (err: any) => {
          this.errorDesc = err.message;
          this.loading = false;
          return false;
        }
      });
  }

  cancel(): void {
    this.location.back();
  }
}
