import { Component, Element, h, Host, Method, Prop } from '@stencil/core'
import { default as TypeItCore } from 'typeit'
import {
  TailwindColorValue
} from 'tailwindcss/tailwind-config'
import data from './test/fixture'
import { Element as TypeItElement } from 'typeit/dist/types'

function initialIsCapital(word) {
  return word.charAt(0) !== word.charAt(0).toLowerCase()
}

function tint(
  text: string,
  color: TailwindColorValue,
  bold = false
) {
  return `<code class="${color} ${bold ? 'font-bold' : ''}">${text}</code>`
}

function paint(line) {
  if (!line) return ''
  return tint(
    line,
    initialIsCapital(line) ? 'text-violet-300' : 'text-emerald-200'
  )
}

function caret() {
  return tint('&gt;', 'text-amber-200', true)
}

function bubble(text) {
  return `<div class="bubble" role="alert">
    <span class="inline flex-shrink-0 mr-3 w-5 h-5">🤖</span>
    <div>${text}</div>
  </div>`
}

@Component({
  tag: 'term-typist',
  styleUrl: 'term-typist.css',
  // scoped: true
})
export class TermTypist {
  @Element() el: TypeItElement
  termel: HTMLElement
  typist: any
  frozen = false

  @Prop()
  playbook = data

  printContext(context) {
    this.typist = this.typist
      .type(
        bubble(context),
        { speed: 0 }
      )
      .break({
        speed: 0
      })
      .pause(500)
    return this
  }

  typeCommand(command) {
    this.typist = this.typist
      .type(
        `${caret()} ${tint(command, 'text-yellow-500')}`,
        { speed: 80 }
      )
      .pause(500)
    return this
  }

  printOutput(output: string[]) {
    this.typist = output.reduce(
      (typist, line) => typist
        .type(paint(line), { instant: true })
        .break({ instant: true }),
      this.typist
    ).pause(500)
    return this
  }

  @Method()
  public async freezeUntilClick() {
    this.typist = this.typist.break()
      .exec(() => {
        this.el
          .querySelector('#continue-button')
          .classList.remove('hidden')
        this.typist.freeze()
      })
  }

  @Method()
  public async unfreeze() {
    this.frozen = false
    this.el
      .querySelector('#continue-button')
      .classList.add('hidden')
    this.typist.unfreeze()
  }

  simulateCommand(cmd) {
    console.log('simulating', cmd)
    if (cmd.emptybefore) {
      this.typist = this.typist.empty()
    }

    this
      .printContext(cmd.context)
      .typeCommand(cmd.input)
      .printOutput(cmd.output)
      .typeCommand('')

    this.typist = this.typist.type(() => {
      if (cmd.pauseafter) {
        this.freezeUntilClick()
      }
      return ''
    })

  }

  async componentDidLoad() {
    setTimeout(() => {
      this.typist = new TypeItCore(
        '#terminal',
      {
        waitUntilVisible: false,
        speed: 0,
        startDelay: 900,
        lifeLike: true,
        html: true
      })

      this.playbook.plays.forEach(cmd => this.simulateCommand(cmd))
      this.typist.go()
    }, 1000)
  }

  render() {
    const unfreeze = () => this.unfreeze()
    return (
      <Host>
        <div class="outer-frame">
          <div class="title-bar">
            <div></div>
            <div class="title">developer@openlab.tools: ~</div>
            <div class="flex flex-row">
              <span class="dot-btn bg-yellow-200"></span>
              <span class="dot-btn bg-green-200"></span>
              <span class="dot-btn bg-red-200"></span>
            </div>
          </div>
          <div class="term-pane-frame">
            <div id="terminal" class="term-pane"></div>
            <div class="button-bar hidden" id="continue-button">
              <openlab-button onClick={unfreeze}>
                next
              </openlab-button>
            </div>
          </div>
        </div>
      </Host>
    )
  }
}
