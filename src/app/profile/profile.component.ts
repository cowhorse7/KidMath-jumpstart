import { Component, Input, OnInit } from '@angular/core';
import { Profile, UserService } from '../user.service';
import { AuthResponse, AuthSession } from '@supabase/supabase-js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  // implements OnInit {
  loading = false;
  profile!: Profile;
  username: string = '';
  best_score: number = 0;
  best_time: number = 0.0;
  formData = {
    username: '',
    password: '',
  };
  signupFormData = {
    username: '',
    password: '',
  };

  @Input()
  session!: AuthSession;

  constructor(private supabase: UserService) {}

  async profileDeclaration() {
    //ngOnInit(): Promise<void> {
    await this.getProfile();
    this.best_score = this.profile.best_score;
    this.best_time = this.profile.best_time;
  }

  async getProfile() {
    try {
      this.loading = true;
      const { user } = this.session;
      const {
        data: profile,
        error,
        status,
      } = await this.supabase.Profile(user);
      if (error && status !== 406) {
        throw error;
      }
      if (profile) {
        this.profile = profile;
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.loading = false;
    }
  }

  async onSubmit(
    passed: Promise<AuthResponse> | PromiseLike<{ error: any }> | { error: any }
  ): Promise<void> {
    try {
      this.loading = true;
      const { error } = await passed;
      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.loading = false;
    }
  }

  login() {
    this.onSubmit(
      this.supabase.signIn(this.formData.username, this.formData.password)
    );
    this.username = this.formData.username;
  }
  logout() {
    this.supabase.signOut();
    this.username = '';
  }
  signUp() {
    this.onSubmit(
      this.supabase.signUp(
        this.signupFormData.username,
        this.signupFormData.password
      )
    );
    this.username = this.signupFormData.username;
  }
}
