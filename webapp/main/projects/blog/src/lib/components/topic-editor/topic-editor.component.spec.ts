import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { TopicEditorComponent } from './topic-editor.component';
import { TopicsService } from '../../services/topics.service';

describe('TopicEditorComponent', () => {
  let component: TopicEditorComponent;
  let fixture: ComponentFixture<TopicEditorComponent>;
  let service: jasmine.SpyObj<TopicsService>;
  let route: ActivatedRoute;

  beforeEach(async () => {
    service = jasmine.createSpyObj<TopicsService>('TopicsService',
      ['one','create','update'], {
        onChange: new Subject()
      }
    );

    await TestBed.configureTestingModule({
      declarations: [ TopicEditorComponent ],
      imports: [RouterTestingModule],
      providers: [
        { provide: TopicsService, useValue: service },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicEditorComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
