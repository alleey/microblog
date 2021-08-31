import { AsyncValidatorFn } from '@angular/forms';
import { PostsService } from '../services/posts.service';
export declare function uniqueSlugValidator(postService: PostsService): AsyncValidatorFn;
