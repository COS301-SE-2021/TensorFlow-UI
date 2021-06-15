import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeElementComponent } from './node-element.component';

describe('NodeElementComponent', () => {
  let component: NodeElementComponent;
  let fixture: ComponentFixture<NodeElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
