import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineConnectorComponent } from './line-connector.component';

describe('LineConnectorComponent', () => {
  let component: LineConnectorComponent;
  let fixture: ComponentFixture<LineConnectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineConnectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineConnectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
