import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-test';
  leftLinks = [
    { label: 'Play', route: '/game' },
    { label: 'Leaderboard', route: '/leaderboard' },
  ];
  rightLinks = [{ label: 'Sign in', route: '/profile' }];
}
