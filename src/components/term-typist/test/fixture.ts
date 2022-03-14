
const data = {
  config: {

  },
  plays: [
    {
      context: `Get started by installing the OpenLab CLI...`,
      input: 'npm install -g @labdao/openlab-cli',
      output: `
  + @labdao/openlab-cli@0.0.3
  updated 1 package in 63.801s`.split('\n'),
      emptybefore: true,
      pauseafter: true
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
      pauseafter: true,
      emptybefore: true,
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
  `.split('\n'),
      pauseafter: true,
      emptybefore: true
    },
  ]
}

console.log(JSON.stringify(data))

export default data
