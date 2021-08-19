import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Node } from './node.component';
import {NgxsModule} from "@ngxs/store";
import {WorkspaceState} from "../../Storage/workspace";

describe('NodeComponent', () => {
  let component: Node;
  let fixture: ComponentFixture<Node>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([
      WorkspaceState
      ]),],
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
