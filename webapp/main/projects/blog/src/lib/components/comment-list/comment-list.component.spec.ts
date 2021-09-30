import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CommentListComponent } from './comment-list.component';
import { CommentsService } from '../../services/comments.service';
import { Subject } from 'rxjs';

describe('CommentListComponent', () => {
  let component: CommentListComponent;
  let fixture: ComponentFixture<CommentListComponent>;
  let service: jasmine.SpyObj<CommentsService>;
  let route: ActivatedRoute;

  beforeEach(async () => {
    service = jasmine.createSpyObj<CommentsService>('CommentsService',
      ['one','create','update'], {
        onChange: new Subject()
      }
    );

    await TestBed.configureTestingModule({
      declarations: [ CommentListComponent ],
      imports: [RouterTestingModule],
      providers: [
        { provide: CommentsService, useValue: service },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
