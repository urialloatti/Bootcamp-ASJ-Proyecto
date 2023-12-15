import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupliersNewComponent } from './supliers-new.component';

describe('SupliersNewComponent', () => {
  let component: SupliersNewComponent;
  let fixture: ComponentFixture<SupliersNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupliersNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupliersNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
