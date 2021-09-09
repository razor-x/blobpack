import path from 'path'

import { install } from '../index.js'

export default ({ log }) =>
  async (pkg) => {
    const logger = {
      log: (msg) => log.info(msg),
      error: (err) => log.error({ err })
    }
    return install({ logger, pkg: pkg ?? path.join('fixtures', 'config.json') })
  }
