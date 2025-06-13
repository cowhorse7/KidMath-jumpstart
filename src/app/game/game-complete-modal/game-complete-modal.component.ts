import { Component, Inject, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-game-complete-modal',
  templateUrl: './game-complete-modal.component.html',
  styleUrls: ['./game-complete-modal.component.css'],
})
export class GameCompleteModalComponent {
  readonly dialogRef = inject(MatDialogRef<GameCompleteModalComponent>);

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { score: number; time: string; win: boolean }
  ) {}
  close() {
    this.dialogRef.close();
  }
}
