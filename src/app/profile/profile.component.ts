import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../service/supabase.service';
import { AuthSession } from '@supabase/supabase-js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  // implements OnInit {
  loading = false;
  username: string = '';
  best_score: number = 0;
  best_time: number = 0.0;
  profile: any = null;
  email: string = '';
  session: AuthSession | null = null;

  constructor(private supabase: SupabaseService) {}

  ngOnInit(): void {
    this.supabase.session$.subscribe((session) => (this.session = session));
    if (this.session) this.loadProfile;
  }

  async loadProfile(user: any) {
    this.loading = true;
    const { data, error } = await this.supabase.getUsername(user);
    if (!error) this.username = data.username;
    this.loading = false;
  }

  async login() {
    this.loading = true;
    await this.supabase.signIn(this.email);
    alert('Check your email for the login link!');
    this.loading = false;
  }

  async logout() {
    await this.supabase.signOut();
    this.session = null;
    this.profile = null;
    this.username = '';
  }
}
