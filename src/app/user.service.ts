import { Injectable } from '@angular/core';
import { createClient, AuthSession, User } from '@supabase/supabase-js';
import { environment } from '../environments/environment.prod';
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

  getSession() {
    return this.supabase.auth.getSession().then(({ data }) => data.session);
  }

  getUser() {
    return this.supabase.auth.getUser().then(({ data }) => data.user);
  }

  signIn(email: string) {
    return this.supabase.auth.signInWithOtp({
      email: email,
      // options: {
      // emailRedirectTo: 'https://jumpstart-nu.vercel.app/profile',}
    });
  }

  signOut() {
    return this.supabase.auth.signOut();
  }

  getProfile(user: User) {
    return this.supabase
      .from('Profile')
      .select('username, best_score, best_time')
      .eq('id', user.id)
      .single();
  }
}
