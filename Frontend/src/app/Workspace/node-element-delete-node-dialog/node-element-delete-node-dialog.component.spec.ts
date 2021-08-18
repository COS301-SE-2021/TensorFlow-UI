import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeElementDeleteNodeDialogComponent } from './node-element-delete-node-dialog.component';

describe('NodeElementDeleteNodeDialogComponent', () => {
  let component: NodeElementDeleteNodeDialogComponent;
  let fixture: ComponentFixture<NodeElementDeleteNodeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeElementDeleteNodeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeElementDeleteNodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
