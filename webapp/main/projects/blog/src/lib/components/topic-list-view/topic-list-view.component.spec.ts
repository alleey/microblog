import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TopicListViewComponent, TopicListViewEvent } from './topic-list-view.component';
import { TopicModel } from '../../models/topic';

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
  });

  it('should fire onSelect when clicked', fakeAsync(() => {

    const models: TopicModel[] = [
      { 
        id: 1, 
        caption: "text",
      }
    ];

    component.items = models;
    fixture.detectChanges();

    let el = fixture.debugElement.query(By.css('[data-testid="select"]')).nativeElement;
    let firedEvent: TopicListViewEvent|undefined = undefined;

    component.onSelectItem.subscribe({
      next: (evt: TopicListViewEvent) => {
        firedEvent = evt;
      }
    });
    el.click();
    tick();

    expect(firedEvent).toBeTruthy();
    expect(firedEvent!.item).toEqual(models[0]);
  }));

});
