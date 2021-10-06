
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, of, Subject, throwError } from 'rxjs';
import { BlogPostListResponseModel } from '../models/blog-post';
import { PostsService } from '../services/posts.service';
import { uniqueSlugValidator } from './unique-slug-validator';

describe('uniqueSlugValidator', () => {
  let service: jasmine.SpyObj<PostsService>;

  beforeEach(() => {
    service = jasmine.createSpyObj<PostsService>('PostsService',
      ['findBySlug'], {
        onChange: new Subject()
      }
    );
  });

  const posts: BlogPostListResponseModel = {
    _embedded: {
      posts: [
        { 
          id: 1, 
          slug: "slug",
          title: "title",
          text: "text",
          owner: "me",
          permalink: "http://post/1",
          createdOn: new Date(), 
          updateOn: new Date() 
        }
      ]
    },
    page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
  };

  it('should signal true when slug already exists', () => {
    
    const control = { value: "slug", pristine: false } as AbstractControl;
    service.findBySlug.withArgs("", "slug").and.returnValue(of(posts));

    let validator: AsyncValidatorFn  = uniqueSlugValidator(service);
    let observable = validator(control) as Observable<any>;
    let result: any = null;

    observable.subscribe({
      next: (res: any) => {
        result = res;
      }
    })

    expect(result).toEqual({'slugExists': true});
  });

  it('should NOT signal true when slug DOESNT exists', () => {
    
    const control = { value: "slug", pristine: false } as AbstractControl;
    service.findBySlug.withArgs("", "slug").and.returnValue(of({} as BlogPostListResponseModel));

    let validator: AsyncValidatorFn  = uniqueSlugValidator(service);
    let observable = validator(control) as Observable<any>;
    let result: any = null;

    observable.subscribe({
      next: (res: any) => {
        result = res;
      }
    })

    expect(result).toBeNull();
  });

  it('should NOT signal true when slug status cannot be determined', () => {
    
    const control = { value: "slug", pristine: false } as AbstractControl;
    const apiError = new Error();
    service.findBySlug.withArgs("", "slug").and.returnValue(throwError(apiError));

    let validator: AsyncValidatorFn  = uniqueSlugValidator(service);
    let observable = validator(control) as Observable<any>;
    let result: any = null;

    observable.subscribe({
      next: (res: any) => {
        result = res;
      }
    })

    expect(result).toEqual({'slugExistsApiError': true, error: apiError});
  });

  it('should not validate if the control is pristine', () => {
    
    const control = { value: "slug", pristine: true } as AbstractControl;
    service.findBySlug.withArgs("", "slug").and.returnValue(of(posts));

    let validator: AsyncValidatorFn  = uniqueSlugValidator(service);
    let observable = validator(control) as Observable<any>;
    let result: any = null;

    observable.subscribe({
      next: (res: any) => {
        result = res;
      }
    })

    expect(service.findBySlug).not.toHaveBeenCalled();
  });

  it('should not validate if the control has empty value', () => {
    
    const control = { value: "", pristine: false } as AbstractControl;
    service.findBySlug.withArgs("", "slug").and.returnValue(of(posts));

    let validator: AsyncValidatorFn  = uniqueSlugValidator(service);
    let observable = validator(control) as Observable<any>;
    let result: any = null;

    observable.subscribe({
      next: (res: any) => {
        result = res;
      }
    })

    expect(service.findBySlug).not.toHaveBeenCalled();
  });

});
