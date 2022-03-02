import { newE2EPage } from '@stencil/core/testing';

describe('term-typist', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<term-typist></term-typist>');

    const element = await page.find('term-typist');
    expect(element).toHaveClass('hydrated');
  });
});
