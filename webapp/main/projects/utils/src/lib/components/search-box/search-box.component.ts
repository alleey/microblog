import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'utils-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  @Input() debounceTime: number = 500;
  @Input() context: any = {};
  @Input() controlTemplate: TemplateRef<any> | undefined;

  @Output() onApplyFilter = new EventEmitter<string>();

  @ViewChild('searchBox') searchBox?: ElementRef;

  filter$ = new Subject<string>();
  subscription!: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.subscription = this.filter$.pipe(
      debounceTime(this.debounceTime),
      distinctUntilChanged()
    ).subscribe((filterValue: string) => {
      this.onApplyFilter.emit(filterValue);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  doSearch() {
    const value = this.searchBox?.nativeElement.value;
    this.search(value);
  }

  search(text: string) {
    this.filter$.next(text);
  }
}
