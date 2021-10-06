import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import { of, Subject, throwError } from 'rxjs';
import { AlertComponent, LoaderComponent, PagerComponent, SearchBoxComponent } from 'utils';
import { TopicListResponseModel } from '../../models/topic';
import { TopicsService } from '../../services/topics.service';
import { TopicListViewComponent, TopicListViewEvent } from '../topic-list-view/topic-list-view.component';
import { TopicListComponent } from './topic-list.component';

describe('TopicListComponent', () => {
  let component: TopicListComponent;
  let fixture: ComponentFixture<TopicListComponent>;
  let service: jasmine.SpyObj<TopicsService>;
  let route: ActivatedRoute;

  beforeEach(async () => {
    service = jasmine.createSpyObj<TopicsService>('TopicsService',
      ['all','findMatchingCaption'], {
        onChange: new Subject()
      }
    );

    await TestBed.configureTestingModule({
      declarations: [ 
        TopicListComponent, 
        MockComponent(TopicListViewComponent),
        MockComponent(PagerComponent),
        MockComponent(SearchBoxComponent),
        MockComponent(AlertComponent),
        MockComponent(LoaderComponent)
      ],
      imports: [RouterTestingModule],
      providers: [
        { provide: TopicsService, useValue: service },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicListComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
  });

  it('should render topics list when found', () => {

    const pageable = { page: 0 };
    const topicsResponse: TopicListResponseModel = {
      _embedded: {
        topics: [ 
          { id: 1,  caption: "localhost" }
         ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };

    service.all.withArgs("", pageable).and.returnValue(of(topicsResponse));

    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.hasItems).toBeTrue();
    expect(component.page?.number).toEqual(0);
    expect(component.items).toEqual(topicsResponse._embedded.topics);
  });

  it('should NOT render topics list when NOT found', () => {

    const pageable = { page: 0 };
    service.all.withArgs("", pageable).and.returnValue(throwError(new Error()));

    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.hasItems).toBeFalse();
    expect(component.page?.number).toBeFalsy();
    expect(component.items).toBeFalsy();
  });

  it('should render search results when filter is supplied', () => {

    const pageable = { page: 0 };
    const topicsResponse: TopicListResponseModel = {
      _embedded: {
        topics: [ 
          { id: 1,  caption: "localhost" }
         ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };

    service.findMatchingCaption.withArgs("", "localhost", pageable).and.returnValue(of(topicsResponse));
    component.filterText = "localhost";

    fixture.detectChanges();
    expect(component.hasItems).toBeTrue();
    expect(component.page?.number).toEqual(0);
    expect(component.items).toEqual(topicsResponse._embedded.topics);
  });

  it('should requery when filter is applied from search box', () => {

    const { debugElement } = fixture;

    const pageable = { page: 0 };
    const topicsResponse: TopicListResponseModel = {
      _embedded: {
        topics: [ 
          { id: 1,  caption: "localhost" }
         ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };

    service.all.withArgs("", pageable).and.returnValue(of(topicsResponse));
    service.findMatchingCaption.withArgs("", "findthis", pageable).and.returnValue(of(topicsResponse));
    fixture.detectChanges();

    const search = debugElement.query(By.directive(SearchBoxComponent)).componentInstance;
    search.onApplyFilter.emit("findthis");
    fixture.detectChanges();

    expect(component.hasItems).toBeTrue();
    expect(component.page?.number).toEqual(0);
    expect(component.items).toEqual(topicsResponse._embedded.topics); 
  });

  it('should refresh when service onChange is triggered', () => {

    const pageable = { page: 0 };
    const topicsResponse: TopicListResponseModel = {
      _embedded: {
        topics: [ 
          { id: 1,  caption: "localhost" }
         ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };

    service.all.withArgs("", pageable).and.returnValue(of(topicsResponse));
    fixture.detectChanges();

    service.onChange.next({});
    fixture.detectChanges();

    expect(service.all).toHaveBeenCalledTimes(2);
  });

  it('should go to page number passed as parameter', () => {

    const pageable = { page: 1 };
    const topicsResponse: TopicListResponseModel = {
      _embedded: {
        topics: [ 
          { id: 1,  caption: "localhost" }
         ]
      },
      page: { number: 1, size: 1, totalElements:1, totalPages: 1 }
    };

    spyOnProperty(route, "paramMap").and.returnValue(
      of(convertToParamMap({ pageNum: 1 }))
    );
    service.all.withArgs("", pageable).and.returnValue(of(topicsResponse));

    fixture.detectChanges();
    expect(service.all).toHaveBeenCalled();
    expect(component.page?.number).toEqual(1);
  });

  it('should go to page number selected by pager', () => {

    const { debugElement } = fixture;

    const topicsResponse: TopicListResponseModel = {
      _embedded: {
        topics: [ 
          { id: 1,  caption: "localhost" }
         ]
      },
      page: { number: 1, size: 1, totalElements:1, totalPages: 1 }
    };

    service.all.withArgs("", { page: 0 }).and.returnValue(of(topicsResponse));
    fixture.detectChanges();

    service.all.withArgs("", { page: 1 }).and.returnValue(of(topicsResponse));

    const pager = debugElement.query(By.directive(PagerComponent)).componentInstance;
    pager.onSelectPage.emit(2);
    fixture.detectChanges();

    expect(service.all).toHaveBeenCalled();
  });

  it('should fire onEvent when clicked', () => {

    const pageable = { page: 0 };   
    const topicsResponse: TopicListResponseModel = {
      _embedded: {
        topics: [ 
          { id: 1,  caption: "localhost" }
         ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };

    service.all.withArgs("", pageable).and.returnValue(of(topicsResponse));
    fixture.detectChanges();

    const { debugElement } = fixture;
    const view = debugElement.query(By.directive(TopicListViewComponent)).componentInstance;

    let firedEvent: TopicListViewEvent|undefined = undefined;
    component.onEvent.subscribe((evt: TopicListViewEvent) => {
      firedEvent = evt;
    });
    view.onEvent.emit({ opcode: 'select', item: topicsResponse._embedded.topics[0] });
    fixture.detectChanges();

    expect(firedEvent).toBeTruthy();
    expect(firedEvent!.item).toEqual(topicsResponse._embedded.topics[0]);
  });

});
