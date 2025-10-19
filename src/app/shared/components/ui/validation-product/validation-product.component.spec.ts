import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationProductComponent } from './validation-product.component';

describe('ValidationProductComponent', () => {
  let component: ValidationProductComponent;
  let fixture: ComponentFixture<ValidationProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidationProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
