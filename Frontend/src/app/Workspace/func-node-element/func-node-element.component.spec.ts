import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncNodeElementComponent } from './func-node-element.component';

describe('FuncNodeElementComponent', () => {
  let component: FuncNodeElementComponent;
  let fixture: ComponentFixture<FuncNodeElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuncNodeElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncNodeElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
