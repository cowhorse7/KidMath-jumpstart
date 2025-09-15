import { Component, inject, ViewChild } from '@angular/core';
import { StopwatchComponent } from './stopwatch/stopwatch.component';
import { GameCompleteModalComponent } from './game-complete-modal/game-complete-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent {
  @ViewChild('stopwatch') stopwatch!: StopwatchComponent;
  game = false;
  gameOver = false;
  win = false;
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
  goal: number = 100;

  onSubmit() {
    this.game = true;
    this.gameOver = false;
    this.win = false;
    this.initGame();
  }
  back() {
    this.game = false;
    this.userScore = 0;
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
      case 'Clouds':
        const operandArray = ['+', '-', '/', '*'];
        this.operator = operandArray[Math.floor(Math.random() * 4)];
        break;
      default:
        throw new Error('no defined game mode');
    }
  }

  setOperands() {
    if (this.gameMode === 'Clouds') this.setOperator();
    this.operand1 =
      Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
    this.operand2 =
      Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
    if (this.operator === '-' && this.operand2 > this.operand1) {
      const holder = this.operand1;
      this.operand1 = this.operand2;
      this.operand2 = holder;
    } //consider allowing negative subtraction on hard diff.
    if (this.operator === '/') {
      this.operand1 = this.operand1 * this.operand2;
    }
  }

  initDifficultyVars() {
    switch (this.difficulty) {
      case 'Easy':
        this.healthBar = 6;
        this.max = 12;
        this.min = 1;
        break;
      case 'Medium':
        this.healthBar = 4;
        this.max = 100;
        this.min = 10;
        break;
      case 'Hard': // FIXME: change max/min for mult/div
        this.healthBar = 2;
        this.max = 1000;
        this.min = 100;
    }
  }

  initGame() {
    this.setOperator();
    this.initDifficultyVars();
    this.equationGenerator();
    this.feedback = '';
    setTimeout(() => {
      this.stopwatch.reset();
      this.stopwatch.start();
    });
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
    if (this.userScore === this.goal || this.healthBar === 0) {
      this.stopwatch.stop();
      this.gameOver = true;
      this.openCompletionScreen();
      if (this.userScore === this.goal) this.win = true;
      this.feedback += ' Go back to the select screen to play again!';
    }
    this.equationGenerator();
    this.userAnswer = null;
  }

  readonly dialog = inject(MatDialog);
  openCompletionScreen() {
    const dialogRef = this.dialog.open(GameCompleteModalComponent, {
      data: {
        score: this.userScore,
        time: this.stopwatch.display,
        win: this.win,
      },
    });
  }
}
