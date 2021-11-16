import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject, throwError } from 'rxjs';
import { ResourcesService } from '../../services/resources.service';
import { ResourceComponent } from './resource.component';


describe('ResourceComponent', () => {
  let component: ResourceComponent;
  let fixture: ComponentFixture<ResourceComponent>;
  let service: jasmine.SpyObj<ResourcesService>;

  beforeEach(async () => {

    service = jasmine.createSpyObj<ResourcesService>('ResourcesService',
      ['getResource', 'getResources', 'create', 'update', 'delete'], {
        onChange: new Subject()
      }
    );

    await TestBed.configureTestingModule({
      declarations: [ 
        ResourceComponent
      ],
      providers: [
        { provide: ResourcesService, useValue: service },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceComponent);
    component = fixture.componentInstance;
  });

  it('should render active when resource is found', () => {

    const { debugElement } = fixture;

    const resource = {
      resource: "avatars", key: "default", 
      owner: "me", contentType: "iamge/png",
      createdOn: new Date()
    };

    service.getResource.withArgs("", resource.resource, resource.key).and.returnValue(of(resource));
    component.resource = resource.resource;
    component.key = resource.key;

    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.resourceModel).toBeTruthy();
  });

  it('should render inactive when bookmark is found', () => {

    const { debugElement } = fixture;

    const resource = "resource";
    const key = "key";

    service.getResource.withArgs("", resource, key).and.returnValue(throwError(new Error()));
    component.resource = resource;
    component.key = key;

    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.resourceModel).toBeFalsy();
  });
});
