import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../service/supabase.service';
import { AuthSession, User } from '@supabase/supabase-js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  loading = false;
  username: string = '';
  best_score: number = 0;
  best_time: number = 0.0;
  profile: any = null;
  email: string = '';
  session: AuthSession | null = null;
  editMode = false;
  usernameForm: FormGroup;
  updateError: string | null = null;
  isSubmitting = false;
  user: User | null = null;

  constructor(private supabase: SupabaseService, private fb: FormBuilder) {
    this.usernameForm = this.fb.group({
      username: ['', [Validators.required]],
    });
  }

  async ngOnInit(): Promise<void> {
    this.supabase.session$.subscribe((session) => (this.session = session));
    if (this.session) {
      this.user = await this.supabase.getUser();
      this.loadProfile(this.user);
    }
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

  openEdit(username: string) {
    this.editMode = true;
    this.usernameForm.setValue({ username });
    this.updateError = null;
  }

  cancelEdit() {
    this.editMode = false;
    this.usernameForm.reset();
    this.updateError = null;
  }

  async submitUsername() {
    if (this.usernameForm.invalid) return;
    this.isSubmitting = true;
    this.updateError = null;
    const newUsername = this.usernameForm.value.username;

    const { data: existing } = await this.supabase.checkUsername(newUsername);

    if (existing) {
      this.updateError = 'That username is already taken.';
      this.isSubmitting = false;
      return;
    }

    const { error } = await this.supabase.updateUsername(
      newUsername,
      this.user!.id
    );

    if (error) {
      this.updateError = 'Failed to update username. Please try again.';
    } else {
      this.editMode = false;
    }
    this.isSubmitting = false;
  }
}
