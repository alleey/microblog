import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent, MockModule } from 'ng-mocks';
import { MarkdownModule } from 'ngx-markdown';
import { of, Subject } from 'rxjs';
import { AlertComponent, LoaderComponent } from 'utils';
import { PostsServiceConfigToken } from '../../config/config';
import { BlogPostResponseModel } from '../../models/blog-post';
import { PostsService } from '../../services/posts.service';
import { TopicSelectorComponent } from '../topic-selector/topic-selector.component';
import { BlogPostEditorComponent } from './blog-post-editor.component';


describe('BlogPostEditorComponent', () => {
  let component: BlogPostEditorComponent;
  let fixture: ComponentFixture<BlogPostEditorComponent>;
  let service: jasmine.SpyObj<PostsService>;
  let route: ActivatedRoute;
  let location: Location;

  beforeEach(async () => {
    service = jasmine.createSpyObj<PostsService>('PostsService',
      ['one','create','update','assignTopics'], {
        onChange: new Subject()
      }
    );
    const locationStub = { back: jasmine.createSpy('back') };

    await TestBed.configureTestingModule({
      declarations: [ 
        BlogPostEditorComponent,
        MockComponent(TopicSelectorComponent),
        MockComponent(AlertComponent),
        MockComponent(LoaderComponent),
      ],
      imports: [
        RouterTestingModule, 
        FormsModule, 
        ReactiveFormsModule,
        MockModule(MarkdownModule)
      ],
      providers: [
        { provide: PostsService, useValue: service },
        { provide: PostsServiceConfigToken, useValue: { serviceBaseUrl: "http://localhost", defaultEndpoint: "blog", pageSize: 10 } },
        { provide: Location, useValue: locationStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostEditorComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
    location = TestBed.inject(Location);
  });

  const post: BlogPostResponseModel = {
    id: 1,
    slug: "slug",
    title: "title",
    text: "text",
    owner: "me",
    permalink: "http://post/1",
    createdOn: new Date(),
    updateOn: new Date()
  };

  it('should fetch post details in update mode', () => {

    const { debugElement } =  fixture;

    service.one.withArgs("", post.id).and.returnValue(of(post));
    component.paramPostId = post.id;
    fixture.detectChanges();

    const updateButton = debugElement.query(By.css("[data-testid='update']"));

    expect(service.one).toHaveBeenCalled();
    expect(component.post).toBeTruthy();
    expect(component.text?.value).toEqual(post.text);
    expect(updateButton).toBeTruthy();
  });

  it('should NOT fetch post details in NON-update mode', () => {

    const { debugElement } =  fixture;

    component.paramPostId = post.id;
    component.updateMode = false;
    fixture.detectChanges();

    const createButton = debugElement.query(By.css("[data-testid='create']"));

    expect(service.one).not.toHaveBeenCalled();
    expect(component.post).not.toBeTruthy();
    expect(component.text?.value).toBeFalsy();
    expect(createButton).toBeTruthy();
  });

  it('should use parameters', () => {

    spyOnProperty(route, "paramMap").and.returnValue(
      of(convertToParamMap({ postId: 1 }))
    );
    
    service.one.withArgs("", post.id).and.returnValue(of(post));
    fixture.detectChanges();

    expect(component.postId).toEqual(1);
  });

  it('should create post', () => {

    const { debugElement } =  fixture;

    component.paramPostId = post.id;
    component.updateMode = false;
    fixture.detectChanges();

    component.title?.setValue("title");
    component.slug?.setValue("slug");
    component.text?.setValue("text");
    fixture.detectChanges();

    service.create.withArgs("", "slug", "title", "text").and.returnValue(of(post));
    service.assignTopics.withArgs("", post.id, []).and.returnValue(of(undefined));

    const selector = debugElement.query(By.directive(TopicSelectorComponent)).componentInstance;
    selector.selectedTopics = [];

    const createButton = debugElement.query(By.css("[data-testid='create']"));
    createButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(component.form.valid).toBeTrue();
    expect(service.create).toHaveBeenCalled();
    expect(service.assignTopics).toHaveBeenCalled();
  });

  it('should update post', () => {

    const { debugElement } =  fixture;

    service.one.withArgs("", post.id).and.returnValue(of(post));
    component.paramPostId = post.id;
    fixture.detectChanges();

    service.update.withArgs("", post.id, "slug", "title", "modified").and.returnValue(of(undefined));
    service.assignTopics.withArgs("", post.id, []).and.returnValue(of(undefined));

    component.text?.setValue("modified");
    fixture.detectChanges();

    const selector = debugElement.query(By.directive(TopicSelectorComponent)).componentInstance;
    selector.selectedTopics = [];

    const createButton = debugElement.query(By.css("[data-testid='update']"));
    createButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(component.form.valid).toBeTrue();
    expect(service.update).toHaveBeenCalled();
    expect(service.assignTopics).toHaveBeenCalled();
  });

});
