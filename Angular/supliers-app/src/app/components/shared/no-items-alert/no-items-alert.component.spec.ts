import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoItemsAlertComponent } from './no-items-alert.component';

describe('NoItemsAlertComponent', () => {
  let component: NoItemsAlertComponent;
  let fixture: ComponentFixture<NoItemsAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoItemsAlertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoItemsAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
