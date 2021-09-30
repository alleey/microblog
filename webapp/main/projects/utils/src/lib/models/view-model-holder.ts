import { PartialObserver } from "rxjs";

export class ViewModelHolder<T> {

  loading?: boolean = undefined;
  model?: T;
  err?: Error;

  get hasValue(): boolean { return !!this.model; }
  get hasError(): boolean { return !!this.err; }

  get isLoading(): boolean { return this.loading === true; }
  get isComplete(): boolean { return this.loading === false; }
  get isSuccess(): boolean { return this.isComplete && !this.hasError; }
  get isFailure(): boolean { return this.isComplete && this.hasError; }

  get Model(): T|undefined { return this.model!; }
  set Model(m: T|undefined) {
    this.model = m;
  }

  get Error(): Error { return this.err!; }
  set Error(e: Error) {
    this.err = e;
  }

  public expectModel(opts? : { nextObserver?: PartialObserver<T> }): PartialObserver<T> 
  {
    this.loading = true;
    this.err = undefined;
    return {
      next: (result: T) => {
        this.Model = result;
        this.loading = false;
        opts?.nextObserver?.next?.(result);
        //console.log(this.Model);
      },
      error: (err: Error) => {
        this.Error = err;
        this.loading = false;
        opts?.nextObserver?.error?.(err);
        //console.log(err.message);
      }
    };
  }

  public expectUndefined(opts? : { nextObserver?: PartialObserver<void> }): PartialObserver<void> {
    this.loading = true;
    this.err = undefined;
    return {
      next: () => {
        this.Model = undefined;
        this.loading = false;
        opts?.nextObserver?.next?.();
      },
      error: (err: Error) => {
        this.Error = err;
        this.loading = false;
        opts?.nextObserver?.error?.(err);
      }
    };
  }

  public expectNothing(opts? : { nextObserver?: PartialObserver<void> }): PartialObserver<void> {
    this.loading = true;
    this.err = undefined;
    return {
      next: () => {
        this.loading = false;
        opts?.nextObserver?.next?.();
      },
      error: (err: Error) => {
        this.Error = err;
        this.loading = false;
        opts?.nextObserver?.error?.(err);
      }
    };
  }
}
