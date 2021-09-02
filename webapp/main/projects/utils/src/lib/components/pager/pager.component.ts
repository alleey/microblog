import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { Pageable, PageModel } from '../../models/page';

@Component({
  selector: 'utils-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {

  @Input() context: any;
  @Input() controlTemplate: TemplateRef<any> | undefined;

  @Input() prevNextLinks: boolean = true;
  @Input() maxPageLinks: number = 10;

  @Output() onSelectPage = new EventEmitter<number>();

  pageList: Array<number> = [];
  currentPage: PageModel | undefined;

  @Input() 
  set page(value: PageModel | undefined) {
    this.currentPage = value;
    this.pageList = [];
    if(this.currentPage)
      this.pageList = Array.from({length: this.numberOfPages},(v,k)=>k+1);
    //console.info("Current page " + this.currentPage);
  }
 
  get page(): PageModel | undefined {
      return this.currentPage;
  }


  get numberOfPages(): number {
    return this.currentPage ? this.currentPage.totalPages : 0;
  }

  get previousPage(): number {
    if(!this.prevNextLinks || !this.currentPage || this.currentPage.number == 0)
      return -1;
    return (this.currentPage.number - 1);
  }

  get nextPage(): number {
    if(!this.prevNextLinks || !this.currentPage || this.currentPage.number >= this.currentPage.totalPages)
      return -1;
    return (this.currentPage.number + 1);
  }

  ngOnInit(): void {
  }
  
  selectItem(page: number): void {
    this.onSelectPage.emit(page);
  }

}
