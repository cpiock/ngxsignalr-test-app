import { SignalrTestAppPage } from './app.po';

describe('signalr-test-app App', () => {
  let page: SignalrTestAppPage;

  beforeEach(() => {
    page = new SignalrTestAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
