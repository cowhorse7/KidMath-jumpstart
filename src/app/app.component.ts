import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  rightLinks = [{ label: 'Profile', route: '/profile' }];

  constructor(public router: Router) {}
}
