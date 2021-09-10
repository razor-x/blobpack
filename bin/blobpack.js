#!/usr/bin/env node

import path from 'path'
import { fileURLToPath } from 'url'

import arg from 'arg'

import { build, install, loadJson } from '../index.js'

const args = arg({
  '--version': Boolean,
  '--config-path': String,
  '--tmp-root': String,
  '--config-root': String,
  '--resources-root': String,
  '--dist-root': String
})

if (args['--version'] || args._[0] === 'version') {
  const dir = path.dirname(fileURLToPath(import.meta.url))
  const pkg = await loadJson(path.join(dir, '..', 'package.json'))
  // eslint-disable-next-line no-console
  console.log(pkg.version)
  process.exit(0)
}

if (args._[0] === 'install') {
  await install({
    configPath: args['--config-path'],
    tmpRoot: args['--tmp-root']
  })
}

if (args._[0] === 'build' || args._[0] == null) {
  await build({
    configPath: args['--config-path'],
    tmpRoot: args['--tmp-root'],
    configRoot: args['--config-root'],
    resourcesRoot: args['--resources-root'],
    distRoot: args['--dist-root']
  })
}

const docs = `
  Usage: blobpack [command] [options]


  Commands:

    install        Download Benthos .zip
    build          Build .zip artifacts
    help           Display help

  Options:

    --version         Output the version number
    --config-path     Path to the JSON file containing the blobpack config
    --tmp-root        Path to tmp working directory
    --config-root     Output the version number
    --resources-root  Output the version number
    --dist-root       Output the version number
`

if (args._[0] === 'help') {
  // eslint-disable-next-line no-console
  console.log(docs)
}
