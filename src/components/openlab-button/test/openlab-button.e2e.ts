import { newE2EPage } from '@stencil/core/testing';

describe('openlab-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<openlab-button></openlab-button>');

    const element = await page.find('openlab-button');
    expect(element).toHaveClass('hydrated');
  });
});
