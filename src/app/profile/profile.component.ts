import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AuthSession } from '@supabase/supabase-js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  loading = false;
  session: AuthSession | null = null;
  profile: any = null;
  username: string = '';
  formData = {
    username: '',
    password: '',
  };
  signupFormData = {
    username: '',
    password: '',
  };

  constructor(private supabase: UserService) {}

  async ngOnInit() {
    this.session = await this.supabase.getSession();
    if (this.session && this.session.user) {
      this.loadProfile(this.session.user);
    }
    this.supabase.supabase.auth.onAuthStateChange((_event, session) => {
      this.session = session;
      if (session && session.user) {
        this.loadProfile(session.user);
      } else {
        this.profile = null;
      }
    });
  }

  async loadProfile(user: any) {
    this.loading = true;
    const { data, error } = await this.supabase.getProfile(user);
    if (!error) this.profile = data;
    this.loading = false;
  }

  login() {
    this.supabase.signIn(this.formData.username, this.formData.password);
    this.username = this.formData.username;
  }
  signUp() {
    this.supabase.signUp(
      this.signupFormData.username,
      this.signupFormData.password
    );
    this.username = this.signupFormData.username;
  }
}
