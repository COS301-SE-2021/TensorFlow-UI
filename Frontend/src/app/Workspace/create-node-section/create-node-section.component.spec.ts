import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateNodeSectionComponent } from './create-node-section.component';
import { Node } from '../../Node/Node'

describe('CreateNodeSectionComponent', () => {
  let component: CreateNodeSectionComponent;
  let fixture: ComponentFixture<CreateNodeSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNodeSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNodeSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
