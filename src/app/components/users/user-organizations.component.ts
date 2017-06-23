import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IOrganizationInfo } from '../../datastore/organizations/models';

@Component({
  selector: 'teneo-user-organizations',
  template: `
    <md-select class="input-field"
               placeholder="select organizations" title="Organizations"
               [formControl]="control"
               multiple="true">
      <md-option *ngFor="let org of options" [value]="org.id">{{org.name}}</md-option>
    </md-select>
  `,
  styles: [`
    .input-field {
      width: 100%;
      margin-top: 1em;
    }
  `]
})
export class UserOrganizationsComponent {

  @Input() organizations: IOrganizationInfo[];
  @Input() control: FormControl;

  constructor() {
  }

}
