import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseNewComponent } from './purchase-new.component';

describe('PurchaseNewComponent', () => {
  let component: PurchaseNewComponent;
  let fixture: ComponentFixture<PurchaseNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PurchaseNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchaseNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
