import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationWindowComponent } from './animation-window.component';

describe('AnimationWindowComponent', () => {
  let component: AnimationWindowComponent;
  let fixture: ComponentFixture<AnimationWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimationWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimationWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
