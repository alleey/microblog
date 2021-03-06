import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { TopicsService } from '../services/topics.service';


export function uniqueTopicValidator(topicService: TopicsService): AsyncValidatorFn 
{
  return (control: AbstractControl): {[key: string]: boolean} | any => 
  {
      var caption = control.value;
      if (!caption || control.pristine) {
        return of(null);
      }

      return topicService
        .findByCaption("", caption)
        .pipe(
          map(response => !!response.page?.totalElements ? {'topicExists': true} : null),
          catchError(err => {
            return of({'topicExistsApiError': true, error: err});
          })          
        );
  }
}

