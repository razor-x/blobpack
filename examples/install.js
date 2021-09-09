import { install } from '../index.js'

export default ({ log }) =>
  async (pkg = 'package.json') => {
    const logger = {
      log: (msg) => log.info(msg),
      error: (err) => log.error({ err })
    }
    return install({ logger, pkg })
  }
