import { Component, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css'],
})
export class StopwatchComponent implements OnDestroy {
  public time: number = 0;
  public display: string = '00:00';
  private timerSubscription: Subscription | null = null;
  public running: boolean = false;

  ngOnDestroy(): void {
    this.stop();
  }

  formatTime(totalSeconds: number): string {
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.timerSubscription = interval(1000).subscribe(() => {
      this.time++;
      this.display = this.formatTime(this.time);
    });
  }

  stop() {
    this.running = false;
  }
}
