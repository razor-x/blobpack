import fs from 'fs'
import path from 'path'

import test from 'ava'

import { zipName } from '../lib/install.js'
import { build, install, loadJson } from '../index.js'

const tmpRoot = path.join('tmp', 'build-spec')
const configPath = path.join('fixtures', 'config.json')

test.beforeEach(async (t) => {
  const { benthos } = await loadJson(configPath)
  const name = zipName(benthos)
  const outputPath = path.join(tmpRoot, name)
  const logger = {
    log: (msg) => t.log(msg),
    error: (err) => {
      t.log(err.message)
    }
  }
  try {
    await fs.promises.access(outputPath)
  } catch {
    await install({ configPath, tmpRoot, logger })
  }
})

test('build', async (t) => {
  const configRoot = path.join('fixtures', 'config')
  const resourcesRoot = path.join('fixtures')
  const distRoot = path.join(tmpRoot, 'dist')
  const logger = {
    log: (msg) => t.log(msg),
    error: (err) => {
      t.log(err.message)
    }
  }
  const artifacts = await build({
    configPath,
    tmpRoot,
    configRoot,
    resourcesRoot,
    distRoot,
    logger
  })
  for (const outputPath of artifacts) {
    await fs.promises.access(outputPath)
  }
  t.deepEqual(artifacts, [path.resolve(distRoot, 'foo.zip')])
})
