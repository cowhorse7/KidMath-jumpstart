import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameComponent } from './game/game.component';

import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScoreTableComponent } from './leaderboard/score-table/score-table.component';
import { StopwatchComponent } from './game/stopwatch/stopwatch.component';
import { GameCompleteModalComponent } from './game/game-complete-modal/game-complete-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AnimationWindowComponent } from './game/animation-window/animation-window.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    LeaderboardComponent,
    ProfileComponent,
    ScoreTableComponent,
    StopwatchComponent,
    GameCompleteModalComponent,
    AnimationWindowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatTabsModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
