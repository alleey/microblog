import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockComponent } from 'ng-mocks';
import { AlertComponent } from 'utils';
import { TopicListViewComponent } from '../topic-list-view/topic-list-view.component';
import { TopicListComponent } from '../topic-list/topic-list.component';
import { TopicSelectorComponent } from './topic-selector.component';


describe('TopicSelectorComponent', () => {
  let component: TopicSelectorComponent;
  let fixture: ComponentFixture<TopicSelectorComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ 
        TopicSelectorComponent,
        MockComponent(TopicListComponent),
        MockComponent(TopicListViewComponent),
        MockComponent(AlertComponent)
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicSelectorComponent);
    component = fixture.componentInstance;
  });

  const topicList = [
    { id:1, caption: "one "},
    { id:2, caption: "two "}
  ];

  it('should select passed in topics', () => {

    component.initialTopics = topicList;
    fixture.detectChanges();

    expect(component.selectedTopics).toEqual(component.initialTopics);
    expect(component.isTopicSelected(topicList[0])).toBeTrue();
    expect(component.isTopicSelected(topicList[1])).toBeTrue();
  });

  it('should select topic', () => {

    fixture.detectChanges();

    component.selectTopic(topicList[0]);
    fixture.detectChanges();

    expect(component.isTopicSelected(topicList[0])).toBeTrue();
    expect(component.isTopicSelected(topicList[1])).toBeFalse();
  });

  it('should unselect topic', () => {

    component.initialTopics = topicList;
    fixture.detectChanges();

    component.unselectTopic(topicList[0]);
    fixture.detectChanges();

    expect(component.isTopicSelected(topicList[0])).toBeFalse();
    expect(component.isTopicSelected(topicList[1])).toBeTrue();
  });

  it('should toggle topic selection when clicked', () => {

    const { debugElement } = fixture;

    component.initialTopics = [topicList[0]];
    fixture.detectChanges();

    const view = debugElement.query(By.directive(TopicListComponent)).componentInstance;

    view.onEvent.emit({ opcode: 'select', item: topicList[0] });
    fixture.detectChanges();

    view.onEvent.emit({ opcode: 'select', item: topicList[1] });
    fixture.detectChanges();

    expect(component.isTopicSelected(topicList[0])).toBeFalse();
    expect(component.isTopicSelected(topicList[1])).toBeTrue();
  });

  it('should not allow more than maxTopic selection', () => {

    const { debugElement } = fixture;

    component.maxTopics = 1;
    fixture.detectChanges();

    component.selectTopic(topicList[0]);
    component.selectTopic(topicList[1]);

    expect(component.selectedTopics.length).toEqual(1);
  });

  it('should render topic list in alphabetical order', () => {

    fixture.detectChanges();

    component.selectTopic(topicList[1]);
    component.selectTopic(topicList[0]);

    expect(component.selectedTopics).toEqual(topicList);
  });

});
