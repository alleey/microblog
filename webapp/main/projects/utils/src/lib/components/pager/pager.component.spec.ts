import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PagerComponent } from './pager.component';

describe('PagerComponent', () => {
  let component: PagerComponent;
  let fixture: ComponentFixture<PagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render next and previous links as disabled for single page', () => {

    component.page = {
      number: 0, size: 1, totalElements: 10, totalPages: 1
    };

    fixture.detectChanges();
    const { debugElement } = fixture;

    expect(component.previousPage).toBe(-1);
    expect(component.nextPage).toBe(-1);

    const prev = debugElement.query(By.css('[data-testid="previous-link"]'));
    const next = debugElement.query(By.css('[data-testid="next-link"]'));
    
    expect(prev.classes['disabled']).toBeTruthy();
    expect(next.classes['disabled']).toBeTruthy();
  });

  it('should render next and previous links as enabled for middle page', () => {

    component.page = {
      number: 1, size: 3, totalElements: 10, totalPages: 3
    };

    fixture.detectChanges();
    const { debugElement } = fixture;

    expect(component.previousPage).toBe(0);
    expect(component.nextPage).toBe(2);

    const prev = debugElement.query(By.css('[data-testid="previous-link"]'));
    const next = debugElement.query(By.css('[data-testid="next-link"]'));
    
    expect(prev.classes['disabled']).toBeFalsy();
    expect(next.classes['disabled']).toBeFalsy();
  });

  it('should call event handler when page is selected', () => {

    const page = {
      number: 1, size: 3, totalElements: 10, totalPages: 5
    };
    component.page = page;

    let selectedPage = -1;
    component.onSelectPage.subscribe({
      next: (i: number) => {
        selectedPage = i;
      }
    });

    fixture.detectChanges();
    const { debugElement } = fixture;

    const page1 = debugElement.query(By.css('[data-testid="page-link-3"]'));
    expect(page1).toBeTruthy();

    page1.nativeElement.click();
    fixture.detectChanges();
    
    expect(component.page).toEqual(page);
    expect(selectedPage).toBe(3);
  });

});
