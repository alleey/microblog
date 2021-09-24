import { PartialObserver } from "rxjs";

export class ViewModelHolder<T> {

  loading: boolean = true;
  model?: T;
  err?: Error;

  get hasValue(): boolean { return !!this.model; }
  get hasError(): boolean { return !!this.err; }
  get isLoading(): boolean { return this.loading; }

  get Model(): T|undefined { return this.model!; }
  set Model(m: T|undefined) {
    this.model = m;
  }

  get Error(): Error { return this.err!; }
  set Error(e: Error) {
    this.err = e;
  }

  public expectModel(): PartialObserver<T> {
    this.loading = true;
    this.err = undefined;
    return {
      next: (result: T) => {
        this.Model = result;
        this.loading = false;
        //console.log(this.Model);
      },
      error: (err: Error) => {
        this.Error = err;
        this.loading = false;
        //console.log(err.message);
      }
    };
  }

  public expectNothing(): PartialObserver<void> {
    this.loading = true;
    this.err = undefined;
    return {
      next: () => {
        this.Model = undefined;
        this.loading = false;
      },
      error: (err: Error) => {
        this.Error = err;
        this.loading = false;
      }
    };
  }
}
