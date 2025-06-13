import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  session: any = null;

  ngOnInit() {
    this.supabase.session$.subscribe((session) => (this.session = session));
  }

  title = 'angular-test';
  leftLinks = [
    { label: 'Play', route: '/game' },
    { label: 'Leaderboard', route: '/leaderboard' },
  ];
  rightLinks = [{ label: 'Profile', route: '/profile' }];

  constructor(public router: Router, private supabase: SupabaseService) {}
}
