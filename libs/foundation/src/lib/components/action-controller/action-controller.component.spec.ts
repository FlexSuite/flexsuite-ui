import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionControllerComponent } from './action-controller.component';

describe('ActionControllerComponent', () => {
  let component: ActionControllerComponent;
  let fixture: ComponentFixture<ActionControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionControllerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActionControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});