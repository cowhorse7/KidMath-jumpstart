import { Component, ViewEncapsulation } from '@angular/core';
import { AnimationComponentInterface } from '../animation.interface';

@Component({
  selector: 'app-camel',
  templateUrl: './camel.component.html',
  styleUrl: './camel.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class CamelComponent implements AnimationComponentInterface {
  protected readonly TOTAL = 10;
  protected steps = 0;
  private walking = false;
  protected done = false;

  private getCamelLeft(): number {
    const scene = document.getElementById('scene');
    if (!scene) return 10;
    const sceneW = scene.offsetWidth;
    const maxLeft = sceneW - 138 - 110 - 8;
    return 10 + (maxLeft - 10) * (this.steps / this.TOTAL);
  }

  triggerStep() {
    if (this.walking || this.done) return;
    this.steps++;
    this.walking = true;

    const wrap = document.getElementById('camelWrap')!;
    const bg = document.getElementById('bgScroll')!;
    wrap.classList.add('walking');
    bg.classList.add('walking');
    wrap.style.left = this.getCamelLeft() + 'px';
    this.spawnDust();

    if (this.steps === this.TOTAL) {
      document.getElementById('oasis')!.classList.add('visible');
    }

    setTimeout(() => {
      wrap.classList.remove('walking');
      bg.classList.remove('walking');
      this.walking = false;

      if (this.steps === this.TOTAL) {
        this.done = true;
        wrap.classList.add('celebrating');
        setTimeout(() => {
          document.getElementById('winBanner')!.classList.add('visible');
          this.spawnConfetti();
          setTimeout(() => this.spawnConfetti(), 700);
        }, 400);
        setTimeout(() => wrap.classList.remove('celebrating'), 2800);
      }
    }, 700);
  }

  resetGame() {
    this.steps = 0;
    this.walking = false;
    this.done = false;
    const wrap = document.getElementById('camelWrap')!;
    wrap.style.left = '10px';
    wrap.classList.remove('walking', 'celebrating');
    document.getElementById('bgScroll')!.classList.remove('walking');
    document.getElementById('oasis')!.classList.remove('visible');
    document.getElementById('winBanner')!.classList.remove('visible');
    document.getElementById('confettiWrap')!.innerHTML = '';
  }

  private spawnDust() {
    const c = document.getElementById('dustContainer')!;
    const left =
      parseInt(document.getElementById('camelWrap')!.style.left || '10') + 20;
    for (let i = 0; i < 3; i++) {
      const d = document.createElement('div');
      d.style.cssText = `position:absolute;left:${left + i * 12}px;bottom:0`;
      d.innerHTML = `<svg width="16" height="20" viewBox="0 0 16 20"><circle cx="8" cy="16" r="5" fill="#c47a30" opacity="0.5" style="animation:dustPuff ${0.4 + Math.random() * 0.3}s ease-out ${i * 0.08}s forwards"/></svg>`;
      c.appendChild(d);
      setTimeout(() => d.remove(), 900);
    }
  }

  private spawnConfetti() {
    const colors = [
      '#f4d030',
      '#e85030',
      '#50c840',
      '#4090e8',
      '#e040c0',
      '#f09020',
    ];
    const cw = document.getElementById('confettiWrap')!;
    for (let i = 0; i < 28; i++) {
      const el = document.createElement('div');
      el.className = 'confetto';
      el.style.left = 20 + Math.random() * 60 + '%';
      el.style.top = '-10px';
      el.style.background = colors[Math.floor(Math.random() * colors.length)];
      el.style.animationDuration = 0.9 + Math.random() * 0.7 + 's';
      el.style.animationDelay = Math.random() * 0.5 + 's';
      cw.appendChild(el);
      setTimeout(() => el.remove(), 2000);
    }
  }
}
