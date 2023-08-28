import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSaveClientComponent } from './form-save-client.component';

describe('FormSaveClientComponent', () => {
  let component: FormSaveClientComponent;
  let fixture: ComponentFixture<FormSaveClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormSaveClientComponent]
    });
    fixture = TestBed.createComponent(FormSaveClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
