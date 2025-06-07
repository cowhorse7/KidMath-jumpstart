import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent {
  game = false;
  difficulty: string | null = null;
  gameMode: string | null = null;
  operator: string | null = null;
  operand1: number | null = null;
  operand2: number | null = null;
  answer: number | null = null;

  onSubmit() {
    this.game = true;
  }
  back() {
    this.game = false;
  }

  setOperator() {
    if (this.gameMode === 'Desert') {
      this.operator = '-';
    } else {
      this.operator = '+';
    }
  }

  setOperands() {
    let max: number = 0;
    let min: number = 1;
    if (this.difficulty === 'Easy') {
      max = 12;
    } else {
      max = 100;
    }
    this.operand1 = Math.floor(Math.random() * (max - min + 1)) + min;
    this.operand2 = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  equationGenerator() {
    this.setOperator();
    this.setOperands();
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
}
