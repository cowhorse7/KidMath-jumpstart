import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyDialogComponent } from './ready-dialog.component';

describe('ReadyDialogComponent', () => {
  let component: ReadyDialogComponent;
  let fixture: ComponentFixture<ReadyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadyDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
