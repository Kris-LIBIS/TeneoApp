import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUserInfo, newUserInfo } from '../../datastore/users/reducer';

@Component({
  moduleId: module.id,
  selector: 'teneo-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @Input() users: IUserInfo[];
  @Output() editUserEvent: EventEmitter<IUserInfo> = new EventEmitter();
  @Output() deleteUserEvent: EventEmitter<IUserInfo> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  orgList(user: IUserInfo) {
    return user.organizations.map(org => org.name).join(',');
  }

  addUser() {
    this.editUserEvent.next(newUserInfo());
  }

}
