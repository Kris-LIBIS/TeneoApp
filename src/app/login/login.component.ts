import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/components/common/message';
import { IAppState } from '../datastore/reducer';
import { Store } from '@ngrx/store';
import { AuthRequestAction } from '../datastore/authorization/actions';

@Component({
  selector: 'teneo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  messages: Message[] = [];

  constructor(private _store: Store<IAppState>) { }

  ngOnInit() {
  }

  onSubmit(name: HTMLInputElement, password: HTMLInputElement) {
    this.messages.length = 0;
    this._store.dispatch(new AuthRequestAction({user: name.value, password: password.value}));
    name.value = '';
    password.value = '';
    return false;
  }
}
