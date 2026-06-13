import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesertComponent } from './camel.component';

describe('DesertComponent', () => {
  let component: DesertComponent;
  let fixture: ComponentFixture<DesertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DesertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
