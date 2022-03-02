import { Component, h } from '@stencil/core';
import TypeIt from "typeit";

const clioutput = `
LabDAO OpenLab CLI

VERSION
  @labdao/openlab-cli/0.0.3 linux-x64 node-v14.19.0

USAGE
  $ openlab [COMMAND]

TOPICS
  file  Manage files available to or from OpenLab on IPFS

COMMANDS
  help  Display help for openlab.

`.split('\n')

const fileoutput = `
Manage files available to or from OpenLab on IPFS
USAGE
  $ openlab file COMMAND

COMMANDS
  file list  list files
  file pull  pull a remote file from IPFS to your local file system
  file push  push a local file from your storage system to IPFS

`.split('\n')

function initialIsCapital(word) {
  return word.charAt(0) !== word.charAt(0).toLowerCase()
}

function colourise(line) {
  if (!line) return line
  return initialIsCapital(line) ?
    `<span class="text-amber-300">${line}</span>` :
    line
}

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  el: HTMLAppRootElement;

  async componentDidLoad() {
    let typer = new TypeIt("#terminal", {
      // waitUntilVisible: true,
      speed: 80,
      startDelay: 900
    })
      .type('<span class="text-violet-300 font-bold">&gt; </span>openlab')
      .pause(500)

    clioutput.forEach(line => {
      typer = typer
        .type(colourise(line), { speed: 0 })
        .break({ speed: 0 })
    })

    typer = typer
      .pause(500)
      .type('<span class="text-violet-300 font-bold">&gt; </span>openlab file')
      .pause(500)

    fileoutput.forEach(line => {
      typer = typer
        .type(colourise(line), { speed: 0 })
        .break({ speed: 0 })
    })

    typer.go();
  }

  render() {
    return (
      <p id="terminal" class="w-4/5 h-4/5 m-12 p-5 text-emerald-200 bg-black rounded-md font-mono"></p>
    );
  }
}
