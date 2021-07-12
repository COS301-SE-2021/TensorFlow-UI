import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Link } from './link.component';

describe('LinkComponent', () => {
  let component: Link;
  let fixture: ComponentFixture<Link>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Link ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Link);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
