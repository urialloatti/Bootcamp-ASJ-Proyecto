import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSavedComponent } from './modal-saved.component';

describe('ModalSavedComponent', () => {
  let component: ModalSavedComponent;
  let fixture: ComponentFixture<ModalSavedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalSavedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalSavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
