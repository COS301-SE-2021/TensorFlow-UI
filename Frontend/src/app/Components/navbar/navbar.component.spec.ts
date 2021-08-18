import { ComponentFixture, TestBed } from '@angular/core/testing';
import {NavbarComponent} from "./navbar.component";
import {NgxsModule} from "@ngxs/store";
import {WorkspaceState} from "../../../Storage/workspace";


describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([
        WorkspaceState
      ]),],
      declarations: [ NavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
