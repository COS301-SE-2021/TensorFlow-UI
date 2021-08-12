import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TensorComponent } from './tensor.component';

describe('TensorComponent', () => {
  let component: TensorComponent;
  let fixture: ComponentFixture<TensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TensorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
