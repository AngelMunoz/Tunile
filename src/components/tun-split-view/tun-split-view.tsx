import { Component, Prop, Element, Watch, Method } from '@stencil/core';

@Component({
  tag: 'tun-split-view',
  styleUrl: 'tun-split-view.scss',
  shadow: true
})
export class TunSplitView {
  @Prop({ mutable: true }) isOpen: boolean = false;
  @Prop({ reflectToAttr: true, mutable: true }) position: 'left' | 'right' = 'left';

  @Element() tunSplitView: HTMLTunSplitViewElement;

  nav: HTMLElement;
  main: HTMLElement;

  render() {
    return (
      <article class="tun-split-view">
        <nav class="tun-split-view__nav" ref={nav => this.nav = nav}>
          <slot name="nav"></slot>
        </nav>
        <main class="tun-split-view__content" ref={main => this.main = main}>
          <slot></slot>
        </main>
      </article >
    );
  }

  @Watch('isOpen')
  onIsOpenChange(newVal) {
    if (newVal) {
      this.nav.classList.add('is-open');
      this.main.classList.add('is-open');
    } else {
      this.nav.classList.remove('is-open');
      this.main.classList.remove('is-open');
    }
  }

  @Watch('position')
  onPositionChange(newVal) {
    switch (newVal) {
      case 'left':
        this.nav.classList.add('is-left');
        this.main.classList.add('is-left');
        this.nav.classList.remove('is-right');
        this.main.classList.remove('is-right');
        break;
      case 'right':
        this.nav.classList.add('is-right');
        this.main.classList.add('is-right');
        this.nav.classList.remove('is-left');
        this.main.classList.remove('is-left');
        break;
    }
  }

  @Method()
  async open(): Promise<boolean> {
    return this.isOpen ? false : (this.isOpen = true);
  }

  @Method()
  async close(): Promise<boolean> {
    if (this.isOpen) {
      this.isOpen = false;
      return true;
    }
    return false;
  }

}
