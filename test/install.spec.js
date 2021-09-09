import fs from 'fs'
import path from 'path'

import test from 'ava'
import del from 'del'

import { install } from '../index.js'

test('install', async (t) => {
  const pkg = path.join('fixtures', 'config.json')
  const tmpRoot = path.join('tmp', 'install-spec')
  await del(tmpRoot)
  const logger = {
    log: (msg) => t.log(msg),
    error: (err) => {
      t.log(err.message)
    }
  }
  const outputPath = await install({ pkg, tmpRoot, logger })
  await install({ tmpRoot, logger })
  await fs.promises.access(outputPath)
  t.pass()
})
