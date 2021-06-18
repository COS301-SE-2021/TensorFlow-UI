import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNodeRHSComponent } from './edit-node-rhs.component';

describe('EditNodeRHSComponent', () => {
  let component: EditNodeRHSComponent;
  let fixture: ComponentFixture<EditNodeRHSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNodeRHSComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNodeRHSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
