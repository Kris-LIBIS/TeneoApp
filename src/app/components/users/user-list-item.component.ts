import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUserInfo } from '../../datastore/users/models';

@Component({
  moduleId: module.id,
  selector: 'teneo-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss']
})
export class UserListItemComponent implements OnInit {

  @Input() user: IUserInfo;

  @Output() editUser: EventEmitter<IUserInfo> = new EventEmitter();
  @Output() deleteUser: EventEmitter<IUserInfo> = new EventEmitter();
  @Output() openOrganizations: EventEmitter<IUserInfo> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
