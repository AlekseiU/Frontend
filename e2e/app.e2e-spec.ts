import { MindAssistantPage } from './app.po';

describe('mind-assistant App', () => {
  let page: MindAssistantPage;

  beforeEach(() => {
    page = new MindAssistantPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ma works!');
  });
});
