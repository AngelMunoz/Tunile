import { Component, Prop, Element, Method } from '@stencil/core';
import { TunNavitem } from '../../interfaces';

@Component({
  tag: 'tun-split-view',
  styleUrl: 'tun-split-view.scss',
  shadow: true,
})
export class TunSplitView {
  @Prop({ mutable: true }) isOpen: boolean = false;
  @Prop({ reflectToAttr: true, mutable: true }) position: 'left' | 'right' = 'left';
  @Prop() navItems: TunNavitem[] = [];

  @Element() tunSplitView: HTMLTunSplitViewElement;

  nav: HTMLElement;
  main: HTMLElement;

  render() {
    return (
      <article class="tun-split-view">
        <nav class={`tun-split-view__nav ${this.isOpen ? 'is-open' : ''} ${this.position === 'right' ? 'is-right' : ''}`} ref={nav => this.nav = nav}>
          <li onClick={this.toggleMenu.bind(this)} class="tun-split-view__nav-li__menu">
            {this.isOpen ? <slot name="menu-title">Menu</slot> : ''}
          </li>
          {
            this.navItems.map(
              (item, i) =>
                <li onClick={item.onClick ? item.onClick : null} class="tun-split-view__nav-li">
                  <slot name={`${i}`}></slot>&nbsp;
                  <a class="tun-split-view__nav-a">{this.isOpen ? <span>{item.label}</span> : ''}</a>
                </li>
            )
          }
        </nav>
        <main class={`tun-split-view__content ${this.isOpen ? 'is-open' : ''} ${this.position === 'right' ? 'is-right' : ''}`} ref={main => this.main = main}>
          <slot></slot>
        </main>
      </article >
    );
  }

  @Method()
  async toggleMenu() {
    return this.isOpen = !this.isOpen;
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
