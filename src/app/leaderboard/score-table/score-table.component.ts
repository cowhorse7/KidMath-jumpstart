import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-score-table',
  templateUrl: './score-table.component.html',
  styleUrls: ['./score-table.component.css'],
})
export class ScoreTableComponent {
  @Input()
  data: any[] = [];
  @Input() columns: string[] = [];
}
