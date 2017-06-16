import { browser, by, element } from 'protractor';

export class TeneoPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('teneo-root h1')).getText();
  }
}
