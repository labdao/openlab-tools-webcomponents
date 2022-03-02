import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'openlab-button',
  styleUrl: 'openlab-button.css',
})
export class OpenlabButton {

  render() {
    return (
      <Host>
        <button
          class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden font-mono text-sm text-gray-100 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 hover:text-gray-900 focus:ring-4 focus:ring-lime-200">
          <span
            class="relative px-3 py-1.5 transition-all ease-in duration-75 bg-black rounded-md group-hover:bg-opacity-0"
          >
            <slot></slot>
          </span>
        </button>
      </Host>
    )
  }
}
