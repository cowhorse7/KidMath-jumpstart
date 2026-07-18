import { Component } from '@angular/core';
import {
  MatDialogClose,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';

@Component({
  selector: 'app-ready-dialog',
  imports: [MatDialogClose, MatDialogContent, MatDialogActions],
  templateUrl: './ready-dialog.component.html',
  styleUrl: './ready-dialog.component.css',
})
export class ReadyDialogComponent {}
