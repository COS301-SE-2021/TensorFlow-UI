import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarDialogsComponent} from './navbar-dialogs.component';

describe('NavbarDialogsComponent', () => {
  let component: NavbarDialogsComponent;
  let fixture: ComponentFixture<NavbarDialogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarDialogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarDialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
