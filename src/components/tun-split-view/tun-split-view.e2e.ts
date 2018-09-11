import { newE2EPage, E2EPage } from '@stencil/core/testing';
import { TunSplitView } from './tun-split-view';

describe('tun-split-view', () => {
  it('should build', () => {
    expect(new TunSplitView()).toBeTruthy();
  });

  describe('rendering', () => {
    it('Should work without parameters', async () => {
      const page: E2EPage = await newE2EPage({
        html: `
        <tun-split-view>
          <ul slot="nav">
            <li>A</li>
          </ul>
          <section>
            The rest of your lame content
          </section>
        </tun-split-view>
        `
      });
      const el = await page.find('tun-split-view');
      const [isOpen, position] = await Promise.all([el.getProperty('isOpen'), el.getProperty('position')]);
      expect(isOpen).toBeFalsy();
      expect(position).toEqual('left');
    });
  });
});
