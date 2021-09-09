import fs from 'fs'
import path from 'path'

import test from 'ava'

import { build, install, loadJson } from '../index.js'

const tmpRoot = path.join('tmp', 'build-spec')
const pkg = path.join('fixtures', 'config.json')

test.beforeEach(async (t) => {
  const { benthos } = await loadJson(pkg)
  const name = `${benthos.name}_${benthos.version}_${benthos.platform}.zip`
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
    await install({ tmpRoot, logger })
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
    pkg,
    tmpRoot,
    configRoot,
    resourcesRoot,
    distRoot,
    logger
  })
  t.deepEqual(artifacts, [path.resolve(distRoot, 'foo.zip')])
})
