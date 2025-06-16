import { Injectable } from '@angular/core';
import { createClient, User } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.prod';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  public supabase = createClient(
    environment.SUPABASE_URL,
    environment.SUPABASE_ANON_KEY
  );
  private sessionSubject = new BehaviorSubject<any>(null);
  session$ = this.sessionSubject.asObservable();

  constructor() {
    this.supabase.auth.getSession().then(({ data }) => {
      this.sessionSubject.next(data.session);
    });
    this.supabase.auth.onAuthStateChange((_event, session) => {
      this.sessionSubject.next(session);
    });
  }

  async getSession() {
    return await this.supabase.auth
      .getSession()
      .then(({ data }) => data.session);
  }

  async getUser() {
    return await this.supabase.auth.getUser().then(({ data }) => data.user);
  }

  async signIn(email: string) {
    return await this.supabase.auth.signInWithOtp({
      email: email,
      // options: {
      // emailRedirectTo: 'https://jumpstart-nu.vercel.app/profile',}
    });
  }

  async signOut() {
    return await this.supabase.auth.signOut();
  }

  async getUsername(user: User) {
    return await this.supabase
      .from('Profile')
      .select('username')
      .eq('id', user.id)
      .single();
  }
  async checkUsername(username: string) {
    return await this.supabase
      .from('Profile')
      .select('id')
      .eq('username', username)
      .single();
  }
  async updateUsername(username: string, userId: string) {
    return await this.supabase
      .from('Profile')
      .update({ username: username })
      .eq('id', userId);
  }
}
