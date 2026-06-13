import { Component, input } from '@angular/core';
import { CamelComponent } from './camel/camel.component';

@Component({
  selector: 'app-animation-window',
  templateUrl: './animation-window.component.html',
  imports: [CamelComponent],
  styleUrls: ['./animation-window.component.css'],
  standalone: true,
})
export class AnimationWindowComponent {
  gameMode = input.required<string | null>();
}
