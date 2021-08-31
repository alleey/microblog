import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicListViewComponent } from './topic-list-view.component';

describe('TopicListViewComponent', () => {
  let component: TopicListViewComponent;
  let fixture: ComponentFixture<TopicListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
