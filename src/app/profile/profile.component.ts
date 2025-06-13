import { Component, Input, OnInit } from '@angular/core';
import { SupabaseService } from '../user.service';
import { AuthResponse, AuthSession } from '@supabase/supabase-js';

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
  }
  // async profileDeclaration() {
  // async ngOnInit() {
  //   this.session = await this.supabase.getSession();
  //   if (this.session && this.session.user) {
  //     this.loadProfile(this.session.user);
  //   }
  //   // Subscribe to auth state changes to update UI reactively
  //   this.supabase.supabase.auth.onAuthStateChange((_event, session) => {
  //     this.session = session;
  //     if (session && session.user) {
  //       this.loadProfile(session.user);
  //     } else {
  //       this.profile = null;
  //     }
  //   });
  // }

  // async getProfile() {
  //   try {
  //     this.loading = true;
  //     const { user } = this.session;
  //     const {
  //       data: profile,
  //       error,
  //       status,
  //     } = await this.supabase.Profile(user);
  //     if (error && status !== 406) {
  //       throw error;
  //     }
  //     if (profile) {
  //       this.profile = profile;
  //     }
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       alert(error.message);
  //     }
  //   } finally {
  //     this.loading = false;
  //   }
  // }

  // async onSubmit(
  //   passed: Promise<AuthResponse> | PromiseLike<{ error: any }> | { error: any }
  // ): Promise<void> {
  //   try {
  //     this.loading = true;
  //     const { error } = await passed;
  //     if (error) {
  //       throw error;
  //     }
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       alert(error.message);
  //     }
  //   } finally {
  //     this.loading = false;
  //   }
  // }
  async loadProfile(user: any) {
    this.loading = true;
    const { data, error } = await this.supabase.getProfile(user);
    if (!error) this.profile = data;
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
  }
}
