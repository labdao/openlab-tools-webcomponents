import { Component, h } from '@stencil/core';

@Component({
  tag: 'openlab-button',
  styleUrl: 'openlab-button.css',
  shadow: true
})
export class OpenlabButton {

  render() {
    return (
      <button class="ol-button">
        <span>
          <slot></slot>
        </span>
      </button>
    )
  }
}
