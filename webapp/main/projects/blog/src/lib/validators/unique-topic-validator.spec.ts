
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, of, Subject, throwError } from 'rxjs';
import { TopicListResponseModel } from '../models/topic';
import { TopicsService } from '../services/topics.service';
import { uniqueTopicValidator } from './unique-topic-validator';

describe('uniqueTopicValidator', () => {
  let service: jasmine.SpyObj<TopicsService>;

  beforeEach(() => {
    service = jasmine.createSpyObj<TopicsService>('PostsService',
      ['findByCaption'], {
        onChange: new Subject()
      }
    );
  });

  const topics: TopicListResponseModel = {
    _embedded: {
      topics: [
        { 
          id: 1, 
          caption: "topic",
        }
      ]
    },
    page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
  };

  it('should signal true when topic already exists', () => {
    
    const control = { value: "topic", pristine: false } as AbstractControl;
    service.findByCaption.withArgs("", "topic").and.returnValue(of(topics));

    let validator: AsyncValidatorFn  = uniqueTopicValidator(service);
    let observable = validator(control) as Observable<any>;
    let result: any = null;

    observable.subscribe({
      next: (res: any) => {
        result = res;
      }
    })

    expect(result).toEqual({'topicExists': true});
  });

  it('should NOT signal true when topic DOESNT exists', () => {
    
    const control = { value: "topic", pristine: false } as AbstractControl;
    service.findByCaption.withArgs("", "topic").and.returnValue(of({} as TopicListResponseModel));

    let validator: AsyncValidatorFn  = uniqueTopicValidator(service);
    let observable = validator(control) as Observable<any>;
    let result: any = null;

    observable.subscribe({
      next: (res: any) => {
        result = res;
      }
    })

    expect(result).toBeNull();
  });

  it('should NOT signal true when topic status cannot be determined', () => {
    
    const control = { value: "topic", pristine: false } as AbstractControl;
    const apiError = new Error();
    service.findByCaption.withArgs("", "topic").and.returnValue(throwError(apiError));

    let validator: AsyncValidatorFn  = uniqueTopicValidator(service);
    let observable = validator(control) as Observable<any>;
    let result: any = null;

    observable.subscribe({
      next: (res: any) => {
        result = res;
      }
    })

    expect(result).toEqual({'topicExistsApiError': true, error: apiError});
  });

  it('should not validate if the control is pristine', () => {
    
    const control = { value: "topic", pristine: true } as AbstractControl;
    service.findByCaption.withArgs("", "topic").and.returnValue(of(topics));

    let validator: AsyncValidatorFn  = uniqueTopicValidator(service);
    let observable = validator(control) as Observable<any>;
    let result: any = null;

    observable.subscribe({
      next: (res: any) => {
        result = res;
      }
    })

    expect(service.findByCaption).not.toHaveBeenCalled();
  });

  it('should not validate if the control has empty value', () => {
    
    const control = { value: "", pristine: false } as AbstractControl;
    service.findByCaption.withArgs("", "topic").and.returnValue(of(topics));

    let validator: AsyncValidatorFn  = uniqueTopicValidator(service);
    let observable = validator(control) as Observable<any>;
    let result: any = null;

    observable.subscribe({
      next: (res: any) => {
        result = res;
      }
    })

    expect(service.findByCaption).not.toHaveBeenCalled();
  });

});
