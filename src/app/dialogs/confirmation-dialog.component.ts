import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'teneo-confirmation-dialog',
  template: `
    <h2 md-dialog-title *ngIf="data.title">{{data.title}}</h2>
    <md-dialog-content>{{data.message}}</md-dialog-content>
    <md-dialog-actions align="center">
      <button md-button color="primary" [md-dialog-close]="true">{{data.yes}}</button>
      <button md-button color="primary" md-dialog-close>{{data.no}}</button>
    </md-dialog-actions>
  `,
  // styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {

  constructor(@Inject(MD_DIALOG_DATA) public data: any) {
  }

}
