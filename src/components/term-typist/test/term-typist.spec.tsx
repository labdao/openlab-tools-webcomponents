import { newSpecPage } from '@stencil/core/testing';
import { TermTypist } from '../term-typist';

describe('term-typist', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TermTypist],
      html: `<term-typist></term-typist>`,
    });
    expect(page.root).toEqualHtml(`
      <term-typist>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </term-typist>
    `);
  });
});
