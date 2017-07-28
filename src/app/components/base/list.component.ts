import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'teneo-list',
  template: `
    <md-card>

      <md-card-header color="primary">
        <md-card-title>{{title}}</md-card-title>
        <md-card-subtitle>Last update: {{ lastUpdate | amTimeAgo }}</md-card-subtitle>
      </md-card-header>

      <md-card-content>

        <ng-content></ng-content>

      </md-card-content>

      <md-card-actions align="end">
        <div class="card-buttons">

          <button md-button color="primary" (click)="newObject.next()">
            <md-icon>add</md-icon>
          </button>

          <button md-button color="primary" (click)="reload.next()">
            <md-icon>refresh</md-icon>
          </button>

        </div>
      </md-card-actions>

    </md-card>
  `,
  styles: [`
    .card-buttons {
      position: absolute;
      right: 0;
      top: 0;
    }
  `]
})
export class ListComponent {
  @Input() title: string;
  @Input() lastUpdate: number;
  @Output() newObject: EventEmitter<any> = new EventEmitter();
  @Output() reload: EventEmitter<any> = new EventEmitter();
}
