import { TeneoPage } from './app.po';

describe('teneo App', () => {
  let page: TeneoPage;

  beforeEach(() => {
    page = new TeneoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to teneo!!');
  });
});
