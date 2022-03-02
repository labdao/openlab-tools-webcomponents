import { Component, h } from '@stencil/core'
import TypeIt from 'typeit'
import {
  TailwindColorValue
} from 'tailwindcss/tailwind-config'

const data = [
  {
    context: `Get started by installing the OpenLab CLI...`,
    input: 'npm install -g @labdao/openlab-cli',
    output: `
+ @labdao/openlab-cli@0.0.3
updated 1 package in 63.801s`.split('\n'),
  },
  {
    context: `Once installed, the <code>openlab</code> command is available...`,
    input: 'openlab',
    output: `
LabDAO OpenLab CLI

VERSION
&nbsp;&nbsp;@labdao/openlab-cli/0.0.3 linux-x64 node-v14.19.0

USAGE
&nbsp;&nbsp;$ openlab [COMMAND]

TOPICS
&nbsp;&nbsp;file  Manage files available to or from OpenLab on IPFS

COMMANDS
&nbsp;&nbsp;help  Display help for openlab.`.split('\n'),
  },
  {
    context: `Let's push a file to IPFS...`,
    input: 'openlab file push ./gp47_tail.fasta',
    output: `
Pushing file gp47_tail.fasta to IPFS...
File pushed successfully!
Pinning file via Filecoin...
File pinned successfully!
Here's the metadata for your pinned file:

{
&nbsp;"cid": "bafkreictm5biak56glcshkeungckjwf4tf33wxea566dozdyvhrrebnetu",
&nbsp;"estuaryId": 20902402,
&nbsp;"providers": [
&nbsp;&nbsp;"/ip4/172.31.32.185/tcp/6745/p2p/12D3KooWLV128pddyvoG6NBvoZw7sSrgpMTPtjnpu3mSmENqhtL7",
&nbsp;&nbsp;"/ip4/127.0.0.1/tcp/6745/p2p/12D3KooWLV128pddyvoG6NBvoZw7sSrgpMTPtjnpu3mSmENqhtL7",
&nbsp;&nbsp;"/ip4/172.31.32.185/udp/6746/quic/p2p/12D3KooWLV128pddyvoG6NBvoZw7sSrgpMTPtjnpu3mSmENqhtL7",
&nbsp;&nbsp;"/ip4/127.0.0.1/udp/6746/quic/p2p/12D3KooWLV128pddyvoG6NBvoZw7sSrgpMTPtjnpu3mSmENqhtL7",
&nbsp;&nbsp;"/ip4/35.74.45.12/udp/6746/quic/p2p/12D3KooWLV128pddyvoG6NBvoZw7sSrgpMTPtjnpu3mSmENqhtL7",
&nbsp;&nbsp;"/ip4/35.74.45.12/tcp/6745/p2p/12D3KooWLV128pddyvoG6NBvoZw7sSrgpMTPtjnpu3mSmENqhtL7"
&nbsp;]
}
`.split('\n')
  }
]

console.log(data)

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
  return `<div class="flex p-4 mb-4 text-sm rounded-lg bg-neutral-700 text-gray-50 w-content" role="alert">
    <span class="inline flex-shrink-0 mr-3 w-5 h-5">🤖</span>
    <div>${text}</div>
  </div>`
  // return `<button type="button" class="py-3 px-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-blue-800 font-medium rounded-sm text-md text-center mt-2 mr-2 mb-2">🤖💬 ${text}</button>
  // `
}

@Component({
  tag: 'term-typist',
  styleUrl: 'term-typist.css',
})
export class TermTypist {
  typist: TypeIt;

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
        .type(paint(line), {
          speed: 0
        })
        .break({
          speed: 0
        }),
      this.typist
    ).pause(500)
    return this
  }

  simulateCommand(cmd) {
    this
      .printContext(cmd.context)
      .typeCommand(cmd.input)
      .printOutput(cmd.output)
    this.typist.break().pause(500)
  }

  async componentDidLoad() {
    this.typist = new TypeIt("#terminal", {
      waitUntilVisible: true,
      speed: 0,
      startDelay: 900,
      lifeLike: true,
      html: true
    })

    data.forEach(cmd => this.simulateCommand(cmd))

    this.typist.go()
  }

  render() {
    return (
      <div
        class="w-full h-4/5 m-12 rounded-md font-mono group bg-gradient-to-br from-green-400 to-blue-600"
      >
        <div class="flex flex-row justify-between items-center w-full bg-black bg-opacity-10 rounded-t-md p-2">
          <div></div>
          <div class="flex flex-row font-bold text-neutral-700">developer@openlab.tools: ~</div>
          <div class="flex flex-row">
            <span class="inline-flex p-2 mr-2 rounded-full bg-yellow-200"></span>
            <span class="inline-flex p-2 mr-2 rounded-full bg-green-200"></span>
            <span class="inline-flex p-2 mr-2 rounded-full bg-red-200"></span>
          </div>
        </div>
        <div class="flex flex-grow min-h-full pt-0 pb-px px-px rounded-b-md text-emerald-200 group bg-gradient-to-br from-green-400 to-blue-600">
          <div id="terminal" class="w-full p-5 bg-black bg-opacity-95 rounded-b-md"></div>
        </div>
      </div>
    )
  }
}
