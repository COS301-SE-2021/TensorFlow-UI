import { ComponentFixture, TestBed } from '@angular/core/testing';

class CreateNodeComponent {
}

describe('CreateNodeComponent', () => {
  let component: CreateNodeComponent;
  let fixture: ComponentFixture<CreateNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNodeComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

