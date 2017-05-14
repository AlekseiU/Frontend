import { browser, element, by } from 'protractor';

export class MindAssistantPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ma-root h1')).getText();
  }
}
