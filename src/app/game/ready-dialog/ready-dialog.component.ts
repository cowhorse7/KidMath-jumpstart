import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-ready-dialog',
  imports: [MatDialogModule],
  templateUrl: './ready-dialog.component.html',
  styleUrl: './ready-dialog.component.css',
})
export class ReadyDialogComponent {}
