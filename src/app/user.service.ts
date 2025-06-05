import { Injectable } from '@angular/core';
import { createClient, User } from '@supabase/supabase-js';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public supabase = createClient(
    environment.supabaseUrl,
    environment.supabaseKey
  );

  getSession() {
    return this.supabase.auth.getSession().then(({ data }) => data.session);
  }
  getUser() {
    return this.supabase.auth.getUser().then(({ data }) => data.user);
  }
  usernameToEmail(username: string): string {
    return `${username}@fake.com`;
  }
  signUp(username: string, password: string) {
    return this.supabase.auth.signUp({
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
  getProfile(user: User) {
    //sample perplexity implementation
    return this.supabase
      .from('profiles')
      .select('username, website')
      .eq('id', user.id)
      .single();
  }
}
