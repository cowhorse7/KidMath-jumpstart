import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-test';
  leftLinks = [
    { label: 'Tab 1', route: '/game' },
    { label: 'Tab 2', route: '/leaderboard' },
  ];
  rightLinks = [{ label: 'Tab 3', route: '/profile' }];
}
