import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseSaveDialogComponent } from './purchase-save-dialog.component';

describe('PurchaseSaveDialogComponent', () => {
  let component: PurchaseSaveDialogComponent;
  let fixture: ComponentFixture<PurchaseSaveDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchaseSaveDialogComponent]
    });
    fixture = TestBed.createComponent(PurchaseSaveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
