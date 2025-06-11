import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCompleteModalComponent } from './game-complete-modal.component';

describe('GameCompleteModalComponent', () => {
  let component: GameCompleteModalComponent;
  let fixture: ComponentFixture<GameCompleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameCompleteModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameCompleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
