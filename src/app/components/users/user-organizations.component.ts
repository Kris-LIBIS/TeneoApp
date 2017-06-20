import { Component, Input, OnInit } from '@angular/core';
import { IOrganizationInfo } from '../../datastore/organizations/reducer';
import { FormControl } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'teneo-user-organizations',
  templateUrl: './user-organizations.component.html',
  styleUrls: ['./user-organizations.component.scss']
})
export class UserOrganizationsComponent implements OnInit {

  @Input() organizations: IOrganizationInfo[];
  @Input() control: FormControl;

  constructor() { }

  ngOnInit() {
    // this.control.setValue(this.organizationIds);
  }

  protected getOrgInfo(orgId: string): IOrganizationInfo {
    return _.find(this.organizations, org => org.id === orgId);
  }

  protected isSelected(orgId: string): boolean {
    return !!_.find(this.control.value, id => id === orgId);
  }

}
