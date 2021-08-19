import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootnodeComponent } from './rootnode.component';
import {NgxsModule} from "@ngxs/store";
import {WorkspaceState} from "../../../Storage/workspace";

describe('RootnodeComponent', () => {
  let component: RootnodeComponent;
  let fixture: ComponentFixture<RootnodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([
          WorkspaceState
        ]),
      ],
      declarations: [ RootnodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RootnodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
