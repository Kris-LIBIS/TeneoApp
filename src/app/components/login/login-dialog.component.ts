import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../datastore/reducer';
import { AuthRequestAction } from '../../datastore/authorization/actions';
import { MdDialogRef } from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'teneo-login',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  constructor(private _store: Store<IAppState>,
              private _dialogRef: MdDialogRef<LoginDialogComponent>) { }

  ngOnInit() {
  }

  onSubmit(name: string, password: string) {
    this._store.dispatch(new AuthRequestAction({user: name, password: password}));
    this._dialogRef.close();
    return false;
  }
}
