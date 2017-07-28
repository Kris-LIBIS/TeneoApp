import { Component, Inject, OnInit } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA} from '@angular/material'

@Component({
  selector: 'teneo-edit-dialog',
  template: `
    <form novalidate [formGroup]="">

      <md-dialog-content>

        <ng-content></ng-content>

      </md-dialog-content>

      <md-dialog-actions class="detail-actions" align="end">

        <button md-button color="primary" (click)="saveData()" [disabled]="!userForm.valid">SAVE</button>

        <button md-button color="warn" (click)="undoData()">CANCEL</button>

      </md-dialog-actions>

    </form>

  `,
  styles: []
})
export class EditDialogComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<EditDialogComponent>,
              @Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  saveData() {
    this.dialogRef.close(true);
  }

  undoData() {
    this.dialogRef.close();
  }

}
