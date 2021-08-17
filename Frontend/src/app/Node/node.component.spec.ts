import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Node } from './node.component';

describe('NodeComponent', () => {
  let component: Node;
  let fixture: ComponentFixture<Node>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Node ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Node);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
