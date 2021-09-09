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
