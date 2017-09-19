import { UnisFinPage } from './app.po';

describe('unis-fin App', () => {
  let page: UnisFinPage;

  beforeEach(() => {
    page = new UnisFinPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
