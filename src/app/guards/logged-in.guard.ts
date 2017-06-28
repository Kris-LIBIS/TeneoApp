import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { go } from '@ngrx/router-store';
import { StateService } from '../services/state/state.service';
import { Store } from '@ngrx/store';
import { IAppState } from '../datastore/reducer';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private _state: StateService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._state.loggedIn();
  }
}
