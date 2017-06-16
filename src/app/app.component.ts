import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  moduleId: module.id,
  selector: 'teneo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  app = {title: 'Teneo web app'};

  constructor(translate: TranslateService) {
    translate.addLangs(['en', 'nl', 'fr']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|nl|fr/) ? browserLang : 'en');
  }
}
