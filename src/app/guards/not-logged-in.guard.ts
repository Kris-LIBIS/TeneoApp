import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { StateService } from '../services/state/state.service';
import { Store } from '@ngrx/store';
import { IAppState } from '../datastore/reducer';
import { go } from '@ngrx/router-store';

@Injectable()
export class NotLoggedInGuard implements CanActivate {
  constructor(private _state: StateService, private _store: Store<IAppState>) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this._state.getCurrentUser()) {
      return true;
    }
    this._store.dispatch(go('/dashboard'));
  }
}
