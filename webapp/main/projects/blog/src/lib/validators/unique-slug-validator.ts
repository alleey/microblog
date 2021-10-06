import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { PostsService } from '../services/posts.service';


export function uniqueSlugValidator(postService: PostsService): AsyncValidatorFn 
{
  return (control: AbstractControl): {[key: string]: boolean} | any => 
  {
      var slug = control.value;
      if (!slug || control.pristine) {
        return of(null);
      }

      return postService
        .findBySlug("", slug)
        .pipe(
          map(response => !!response.page?.totalElements ? {'slugExists': true} : null),
          catchError(err => {
            return of({'slugExistsApiError': true, error: err});
          })
        );
  }
}
