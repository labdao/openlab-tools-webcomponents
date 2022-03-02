import {
  Component,
  h
} from '@stencil/core'

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  render() {
    return (
      <main class="flex flex-col bg-black w-screen h-screen items-center p-5">
        <div class="flex-row">
          <openlab-button>📘 read the docs</openlab-button>
          <openlab-button>🧑‍🤝‍🧑 join our Discord</openlab-button>
        </div>
        <div class="w-4/5 p-5">
          <term-typist></term-typist>
        </div>
      </main>
    )
  }
}
