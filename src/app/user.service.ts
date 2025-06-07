import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { environment } from 'src/environment';

export interface Profile {
  id?: string;
  username: string;
  best_score: number;
  best_time: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private supabase: SupabaseClient;
  _session: AuthSession | null = null;
  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }
  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  // getSession() {
  //   return this.supabase.auth.getSession().then(({ data }) => data.session);
  // }
  // getUser() {
  //   return this.supabase.auth.getUser().then(({ data }) => data.user);
  // }
  usernameToEmail(username: string): string {
    return `${username}@fake.com`;
  }
  async signUp(username: string, password: string) {
    return await this.supabase.auth.signUp({
      email: this.usernameToEmail(username),
      password: password,
    });
  }
  signIn(username: string, password: string) {
    return this.supabase.auth.signInWithPassword({
      email: this.usernameToEmail(username),
      password: password,
    });
  }
  signOut() {
    return this.supabase.auth.signOut();
  }
  Profile(user: User) {
    return this.supabase
      .from('Profile')
      .select('username, best_score, best_time')
      .eq('id', user.id)
      .single();
  }
}
