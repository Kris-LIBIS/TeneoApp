import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/primeng';
import { StateService } from '../../services/state/state.service';
import { Store } from '@ngrx/store';
import { IAppState } from '../../datastore/reducer';
import { go } from '@ngrx/router-store';

@Component({
  selector: 'teneo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _state: StateService, private _store: Store<IAppState>) { }

  ngOnInit() {
    if (this._state.getCurrentUser()) {
      this._store.dispatch(go('/dashboard'));
    }
  }

}
