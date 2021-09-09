import path from 'path'

import { install } from '../index.js'

export default ({ log }) =>
  async (configPath) => {
    const logger = {
      log: (msg) => log.info(msg),
      error: (err) => log.error({ err })
    }
    return install({
      logger,
      configPath: configPath ?? path.join('fixtures', 'config.json')
    })
  }
