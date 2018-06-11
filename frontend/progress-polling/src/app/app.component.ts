import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { filter, map, publishReplay, refCount, share, takeUntil, takeWhile } from 'rxjs/internal/operators';

interface ProgressUpdate {
  percentage: number;
  done: boolean;
}

@Component({
  selector: 'app-root',
  template: `
    <div class="content">
      <button mat-button (click)="fetchProgress()">Start fetching progress</button>
      <button mat-button (click)="resetProgress()">Reset progress</button>

      Progress:
      <mat-progress-bar [value]="progressValue$ | async"></mat-progress-bar>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  progressValue$: Observable<number>;

  constructor(private http: HttpClient) {
  }

  fetchProgress() {
    const progressValue$ = interval(1000)
      .pipe(
        switchMap(_ => this.http.get<ProgressUpdate>('api/progress')),
        map(res => res.percentage),
        publishReplay(1),
        refCount()
      );

    this.progressValue$ = progressValue$
      .pipe(
        takeUntil(progressValue$.pipe(filter(percentage => percentage > 100)))
      );
  }

  resetProgress() {
    this.http.get('api/progress/reset').subscribe();
  }

}
