import { UdemyAngularProjectPage } from './app.po';

describe('udemy-angular-project App', () => {
  let page: UdemyAngularProjectPage;

  beforeEach(() => {
    page = new UdemyAngularProjectPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
