import { newSpecPage } from '@stencil/core/testing';
import { OpenlabButton } from '../openlab-button';

describe('openlab-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OpenlabButton],
      html: `<openlab-button></openlab-button>`,
    });
    expect(page.root).toEqualHtml(`
      <openlab-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </openlab-button>
    `);
  });
});
