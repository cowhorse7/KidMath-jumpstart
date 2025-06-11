import { Component, inject, ViewChild } from '@angular/core';
import { StopwatchComponent } from './stopwatch/stopwatch.component';
import { GameCompleteModalComponent } from './game-complete-modal/game-complete-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  imports: [MatDialog, MatDialogModule],
})
export class GameComponent {
  @ViewChild('stopwatch') stopwatch!: StopwatchComponent;
  game = false;
  gameOver = false;
  difficulty: string | null = null;
  gameMode: string | null = null;
  operator: string | null = null;
  operand1: number | null = null;
  operand2: number | null = null;
  answer: number | null = null;
  healthBar: number | null = null;
  userAnswer: number | null = null;
  userScore: number = 0;
  userTime: number = 0.0;
  feedback = '';
  max: number = 0;
  min: number = 0;

  onSubmit() {
    this.game = true;
    this.initGame();
  }
  back() {
    this.game = false;
  }

  setOperator() {
    switch (this.gameMode) {
      case 'Desert':
        this.operator = '-';
        break;
      case 'Ocean':
        this.operator = '+';
        break;
      case 'Forest':
        this.operator = '/';
        break;
      case 'Volcano':
        this.operator = '*';
        break;
      case 'Clouds': //FIXME: add some kind of randomization to this
        this.operator = '+';
        break;
      default:
        throw new Error('no defined game mode');
    }
  }

  setOperands() {
    this.operand1 =
      Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
    this.operand2 =
      Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
    if (
      (this.operator === '/' || this.operator === '-') &&
      this.operand2 > this.operand1
    ) {
      const holder = this.operand1;
      this.operand1 = this.operand2;
      this.operand2 = holder;
    } //consider allowing negative subtraction on hard diff.
  }

  initDifficultyVars() {
    switch (this.difficulty) {
      case 'Easy':
        this.healthBar = 5;
        this.max = 12;
        this.min = 1;
        break;
      case 'Medium':
        this.healthBar = 3;
        this.max = 100;
        this.min = 10;
        break;
      case 'Hard':
        this.healthBar = 1;
        this.max = 1000;
        this.min = 100;
    }
  }

  initGame() {
    this.setOperator();
    this.initDifficultyVars();
    this.equationGenerator();
    this.feedback = '';
    this.stopwatch.reset();
    this.stopwatch.start();
  }

  equationGenerator() {
    this.setOperands();
    // FUTURE: One day, I might like to mix up which blank the user is filling in
    switch (this.operator) {
      case '+':
        this.answer = this.operand1! + this.operand2!;
        break;
      case '-':
        this.answer = this.operand1! - this.operand2!;
        break;
      case '/':
        this.answer = this.operand1! / this.operand2!;
        break;
      case '*':
        this.answer = this.operand1! * this.operand2!;
        break;
      default:
        throw new Error('site bug: invalid operator');
    }
  }

  checkAnswer() {
    if (this.answer === this.userAnswer) {
      this.userScore += 10;
      this.feedback = 'Correct!';
    } else {
      this.healthBar! -= 1;
      this.feedback = 'Incorrect';
    }
    if (this.healthBar === 0) {
      this.stopwatch.stop();
      this.gameOver = true;

      this.feedback =
        "You've run out of tries. Go back to the select screen to play again!"; // FUTURE: pick a funny name to replace "tries" Like 'math juice' lol
    }
    this.equationGenerator();
    this.userAnswer = null;
  }

  readonly dialog = inject(MatDialog);
  openCompletionScreen() {
    const dialogRef = this.dialog.open(GameCompleteModalComponent);
  }
}
