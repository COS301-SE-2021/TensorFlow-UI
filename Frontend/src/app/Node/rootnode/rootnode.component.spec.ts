import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootnodeComponent } from './rootnode.component';

describe('RootnodeComponent', () => {
  let component: RootnodeComponent;
  let fixture: ComponentFixture<RootnodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
