import { Component, input, ViewChild } from '@angular/core';
import { CamelComponent } from './camel/camel.component';
import { AnimationComponentInterface } from './animation.interface';

@Component({
  selector: 'app-animation-window',
  templateUrl: './animation-window.component.html',
  imports: [CamelComponent],
  styleUrls: ['./animation-window.component.css'],
  standalone: true,
})
export class AnimationWindowComponent {
  gameMode = input.required<string | null>();
  @ViewChild('animationComponent')
  animationComponent!: AnimationComponentInterface;

  triggerStep() {
    this.animationComponent.triggerStep();
  }

  resetGame() {
    this.animationComponent.resetGame();
  }
}
