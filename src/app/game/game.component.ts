import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent {
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
    let max: number = 0;
    let min: number = 1;
    switch (this.difficulty) {
      case 'Easy':
        max = 12;
        break;
      case 'Medium':
        max = 100;
        break;
      case 'Hard':
        max = 1000;
    }
    this.operand1 = Math.floor(Math.random() * (max - min + 1)) + min;
    this.operand2 = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  initHealthBar() {
    switch (this.difficulty) {
      case 'Easy':
        this.healthBar = 5;
        break;
      case 'Medium':
        this.healthBar = 3;
        break;
      case 'Hard':
        this.healthBar = 1;
    }
  }

  initGame() {
    this.setOperator();
    this.equationGenerator();
    this.initHealthBar();
    this.feedback = '';
  }

  equationGenerator() {
    this.setOperands();
    // FUTURE: One day, I might like to mix up which blank the user is filling in
    switch (this.operator) {
      case '+':
        this.answer = this.operand1! + this.operand2!;
        break;
      case '-': // FIXME: account for smaller first operand getting negative answers
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
      this.game = false; // FIXME: make this change a little less abrupt-- pop up a modal (based on gameOver variable)!!
      this.gameOver = true;
      this.feedback =
        "You've run out of tries. Go back to the select screen to play again!"; // FUTURE: pick a funny name to replace "tries" Like 'math juice' lol
    }
    this.equationGenerator();
    this.userAnswer = null;
  }
}
