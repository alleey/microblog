import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import { of, Subject } from 'rxjs';
import { AlertComponent, LoaderComponent } from 'utils';
import { TopicResponseModel } from '../../models/topic';
import { TopicsService } from '../../services/topics.service';
import { TopicEditorComponent } from './topic-editor.component';


describe('TopicEditorComponent', () => {
  let component: TopicEditorComponent;
  let fixture: ComponentFixture<TopicEditorComponent>;
  let service: jasmine.SpyObj<TopicsService>;
  let route: ActivatedRoute;
  let location: Location;

  beforeEach(async () => {
    service = jasmine.createSpyObj<TopicsService>('TopicsService',
      ['one','create','update'], {
        onChange: new Subject()
      }
    );
    const locationStub = {
      back: jasmine.createSpy('back')
    };

    await TestBed.configureTestingModule({
      declarations: [ 
        TopicEditorComponent,
        MockComponent(AlertComponent),
        MockComponent(LoaderComponent),
      ],
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule],
      providers: [
        { provide: TopicsService, useValue: service },
        { provide: Location, useValue: locationStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicEditorComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
    location = TestBed.inject(Location);
  });

  const topic: TopicResponseModel = { 
    id: 1, 
    caption: "text",
  };

  it('should fetch topic details in update mode', () => {

    const { debugElement } =  fixture;

    service.one.withArgs("", topic.id).and.returnValue(of(topic));
    component.paramTopicId = topic.id;
    fixture.detectChanges();

    const updateButton = debugElement.query(By.css("[data-testid='update']"));

    expect(service.one).toHaveBeenCalled();
    expect(component.topic).toBeTruthy();
    expect(component.caption?.value).toEqual(topic.caption);
    expect(updateButton).toBeTruthy();
  });

  it('should NOT fetch topic details in NON-update mode', () => {

    const { debugElement } =  fixture;

    component.paramTopicId = topic.id;
    component.updateMode = false;
    fixture.detectChanges();

    const createButton = debugElement.query(By.css("[data-testid='create']"));

    expect(service.one).not.toHaveBeenCalled();
    expect(component.topic).not.toBeTruthy();
    expect(component.caption?.value).toBeFalsy();
    expect(createButton).toBeTruthy();
  });

  it('should use parameters', () => {

    spyOnProperty(route, "paramMap").and.returnValue(
      of(convertToParamMap({ topicId: topic.id }))
    );
    
    service.one.withArgs("", topic.id).and.returnValue(of(topic));
    fixture.detectChanges();

    expect(component.topicId).toEqual(1);
  });

  it('should create topic', fakeAsync(() => {

    const { debugElement } =  fixture;

    component.paramTopicId = topic.id;
    component.updateMode = false;
    fixture.detectChanges();

    service.create.withArgs("", "text").and.returnValue(of(topic));
    component.caption?.setValue("text");
    const createButton = debugElement.query(By.css("[data-testid='create']"));

    createButton.triggerEventHandler('click', {});
    tick();
    fixture.detectChanges();

    expect(component.form.valid).toBeTrue();
    expect(service.create).toHaveBeenCalled();
  }));

  it('should update topic', fakeAsync(() => {

    const { debugElement } =  fixture;

    service.one.withArgs("", topic.id).and.returnValue(of(topic));
    component.paramTopicId = topic.id;
    fixture.detectChanges();

    service.update.withArgs("", topic.id, "modified").and.returnValue(of());
    component.caption?.setValue("modified");
    const createButton = debugElement.query(By.css("[data-testid='update']"));

    createButton.triggerEventHandler('click', {});
    tick();
    fixture.detectChanges();

    expect(component.form.valid).toBeTrue();
    expect(service.update).toHaveBeenCalled();
  }));

});
