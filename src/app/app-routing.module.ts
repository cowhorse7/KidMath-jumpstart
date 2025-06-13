import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { ProfileComponent } from './profile/profile.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'game', component: GameComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '*', component: AppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
