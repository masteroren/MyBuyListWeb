import { MyBuyListWebPage } from './app.po';

describe('my-buy-list-web App', function() {
  let page: MyBuyListWebPage;

  beforeEach(() => {
    page = new MyBuyListWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
