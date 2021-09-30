import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject } from 'rxjs';
import { CommentsServiceConfigToken } from '../../config/config';
import { CommentResponseModel } from '../../models/comment';
import { CommentsService } from '../../services/comments.service';
import { CommentEditorComponent } from './comment-editor.component';

describe('CommentEditorComponent', () => {
  let component: CommentEditorComponent;
  let fixture: ComponentFixture<CommentEditorComponent>;
  let service: jasmine.SpyObj<CommentsService>;
  let route: ActivatedRoute;

  beforeEach(async () => {
    service = jasmine.createSpyObj<CommentsService>('CommentsService',
      ['one','create','update'], {
        onChange: new Subject()
      }
    );

    await TestBed.configureTestingModule({
      declarations: [ CommentEditorComponent ],
      imports: [RouterTestingModule],
      providers: [
        { provide: CommentsService, useValue: service },
        { provide: CommentsServiceConfigToken, useValue: { serviceBaseUrl: "http://localhost", defaultEndpoint: "blog", pageSize: 10 } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentEditorComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
  });

  const postId = 1;
  const comment: CommentResponseModel = { 
    id: 1, 
    text: "text",
    owner: "me",
    createdOn: new Date(), 
    updateOn: new Date() 
  };

  it('should fetch comment details in update mode', () => {

    const { debugElement } =  fixture;

    service.one.withArgs("", postId, comment.id).and.returnValue(of(comment));
    component.paramPostId = postId;
    component.paramCommentId = comment.id;
    fixture.detectChanges();

    const updateButton = debugElement.query(By.css("[data-testid='update']"));

    expect(service.one).toHaveBeenCalled();
    expect(component.comment).toBeTruthy();
    expect(component.text?.value).toEqual(comment.text);
    expect(updateButton).toBeTruthy();
  });

  it('should NOT fetch comment details in NON-update mode', () => {

    const { debugElement } =  fixture;

    component.paramPostId = postId;
    component.paramCommentId = comment.id;
    component.updateMode = false;
    fixture.detectChanges();

    const createButton = debugElement.query(By.css("[data-testid='create']"));

    expect(service.one).not.toHaveBeenCalled();
    expect(component.comment).not.toBeTruthy();
    expect(component.text?.value).toBeFalsy();
    expect(createButton).toBeTruthy();
  });

  it('should use parameters', () => {

    spyOnProperty(route, "paramMap").and.returnValue(
      of(convertToParamMap({ postId: 1, commentId: 1 }))
    );
    
    fixture.detectChanges();

    expect(component.postId).toEqual(1);
    expect(component.commentId).toEqual(1);
  });

  it('should create comment', fakeAsync(() => {

    const { debugElement } =  fixture;

    component.paramPostId = postId;
    component.paramCommentId = comment.id;
    component.updateMode = false;
    fixture.detectChanges();

    service.create.withArgs("", postId, "text").and.returnValue(of(comment));
    component.text?.setValue("text");
    const createButton = debugElement.query(By.css("[data-testid='create']"));

    createButton.triggerEventHandler('click', {});
    tick();
    fixture.detectChanges();

    expect(component.form.valid).toBeTrue();
    expect(service.create).toHaveBeenCalled();
  }));

  it('should create comment', fakeAsync(() => {

    const { debugElement } =  fixture;

    service.one.withArgs("", postId, comment.id).and.returnValue(of(comment));
    component.paramPostId = postId;
    component.paramCommentId = comment.id;
    fixture.detectChanges();

    service.update.withArgs("", postId, comment.id, "modified").and.returnValue(of());
    component.text?.setValue("modified");
    const createButton = debugElement.query(By.css("[data-testid='update']"));

    createButton.triggerEventHandler('click', {});
    tick();
    fixture.detectChanges();

    expect(component.form.valid).toBeTrue();
    expect(service.update).toHaveBeenCalled();
  }));

});
