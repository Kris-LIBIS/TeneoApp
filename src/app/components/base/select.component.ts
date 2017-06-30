import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'teneo-select',
  template: `
    <md-select class="input-field"
               placeholder="select {{name}}" title="{name}}"
               [formControl]="control"
               [multiple]="multiple">
      <md-option *ngFor="let option of options" [value]="option.id">{{option.name}}</md-option>
    </md-select>
  `,
  styles: [`
    .input-field {
      width: 100%;
      margin-top: 1em;
    }
  `]
})
export class SelectComponent {

  @Input() options: any[];
  @Input() control: FormControl;
  @Input() multiple: boolean = false;
  @Input() name: string;

  constructor() {
  }

}
