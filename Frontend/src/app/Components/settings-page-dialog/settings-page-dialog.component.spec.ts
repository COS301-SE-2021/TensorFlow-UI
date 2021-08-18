import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsPageDialogComponent } from './settings-page-dialog.component';

describe('SettingsPageDialogComponent', () => {
  let component: SettingsPageDialogComponent;
  let fixture: ComponentFixture<SettingsPageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsPageDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
