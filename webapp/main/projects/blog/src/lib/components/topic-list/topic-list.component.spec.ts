import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { TopicListComponent } from './topic-list.component';
import { TopicsService } from '../../services/topics.service';

describe('TopicListComponent', () => {
  let component: TopicListComponent;
  let fixture: ComponentFixture<TopicListComponent>;
  let service: jasmine.SpyObj<TopicsService>;
  let route: ActivatedRoute;

  beforeEach(async () => {
    service = jasmine.createSpyObj<TopicsService>('TopicsService',
      ['one','create','update'], {
        onChange: new Subject()
      }
    );

    await TestBed.configureTestingModule({
      declarations: [ TopicListComponent ],
      imports: [RouterTestingModule],
      providers: [
        { provide: TopicsService, useValue: service },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicListComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
