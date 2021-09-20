import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningDialogComponent } from './running-dialog.component';

describe('RunningDialogComponent', () => {
  let component: RunningDialogComponent;
  let fixture: ComponentFixture<RunningDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunningDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RunningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
