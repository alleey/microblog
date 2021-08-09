import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'bookmark-option-view',
  templateUrl: './bookmark-option-view.component.html',
  styleUrls: ['./bookmark-option-view.component.scss']
})
export class BookmarkOptionViewComponent implements OnInit {

  @Input() isBookmarked: boolean = false;
  @Input() url: string = "";

  @Output() onAddBookmark = new EventEmitter();
  @Output() onRemoveBookmark = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  fireAddBoomark(): void {
    this.onAddBookmark.emit();
  }

  fireRemoveBoomark(): void {
    this.onRemoveBookmark.emit();
  }

}
