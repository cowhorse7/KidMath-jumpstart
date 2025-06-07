import { Component } from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent {
  columns = ['username', 'score', 'time'];

  dataset1 = [{ username: 'Raul', score: 12, time: 31.22 }];
  dataset2 = [{ username: 'Polly', score: 27, time: 26.87 }];
  dataset3 = [{ username: 'Solomon', score: 52, time: 11.25 }];
  dataset4 = [{ username: 'American', score: 68, time: 50.61 }];
  dataset5 = [{ username: 'Joe', score: 3, time: 15.02 }];
}
