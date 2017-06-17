import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IAppState } from './datastore/reducer';
import { Store } from '@ngrx/store';
import { Message } from 'primeng/components/common/message';
import { Observable } from 'rxjs/Observable';
import { GuiMessageDeleteAction } from './datastore/gui/actions';
import { IGuiState } from './datastore/gui/reducer';

@Component({
  moduleId: module.id,
  selector: 'teneo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  app = {title: 'Teneo web app'};

  messages: Observable<Message[]>;

  constructor(translate: TranslateService, private _store: Store<IAppState>) {
    translate.addLangs(['en', 'nl', 'fr']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|nl|fr/) ? browserLang : 'en');
    this.messages = this._store.select('gui').map((guiState: IGuiState) => guiState.messages);
  }

  removeMessage(event) {
    this._store.dispatch(new GuiMessageDeleteAction(event.message));
  }
}
