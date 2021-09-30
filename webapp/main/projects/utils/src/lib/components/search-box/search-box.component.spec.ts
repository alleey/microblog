import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SearchBoxComponent } from './search-box.component';

describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should fire onApplyFilter when input is provided', fakeAsync(() => {

    const testInput = "findme";

    let input = fixture.debugElement.query(By.css('[data-testid="search-box"]'));
    let el = input.nativeElement;
    let firedEvent = "";

    component.onApplyFilter.subscribe({
      next: (str: string) => { 
        firedEvent = str;
      }
    });

    el.value = testInput;
    el.dispatchEvent(new Event('input'));
    tick(component.debounceTime);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(firedEvent).toEqual(testInput);
    });
  }));

  it('should only fire onApplyFilter on distinct input', fakeAsync(() => {
 
    const testInput = "findme";

    let input = fixture.debugElement.query(By.css('[data-testid="search-box"]'));
    let el = input.nativeElement;
    let firedEvent = "";

    component.onApplyFilter.subscribe({
      next: (str: string) => {
        firedEvent = str;
      }
    });

    el.value = testInput;
    el.dispatchEvent(new Event('input'));
    tick(component.debounceTime);
    fixture.detectChanges();

    expect(firedEvent).toEqual(testInput);

    firedEvent = "";
    el.value = testInput;
    el.dispatchEvent(new Event('input'));
    tick(component.debounceTime);
    fixture.detectChanges();

    expect(firedEvent).toEqual("");
  }));
});
