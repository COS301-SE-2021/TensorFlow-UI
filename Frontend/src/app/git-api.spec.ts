import { GitAPI } from './git-api';
import {NavbarComponent} from "./Components/navbar/navbar.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";

describe('GitAPI', () => {
  let component: GitAPI;
  let fixture: ComponentFixture<GitAPI>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GitAPI]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(GitAPI);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
})