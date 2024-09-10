import crypto from 'crypto'
import fs from 'fs'
import path from 'path'

import download from 'download'
import mkdirp from 'mkdirp'

import { zipName } from './zip-name.js'
import { loadConfig } from './config.js'

export const install = async ({
  configPath = 'package.json',
  tmpRoot = 'tmp',
  logger = console
} = {}) => {
  try {
    const config = await loadConfig(configPath)
    const { data, name } = await pull(config)
    await write(tmpRoot, name, data)
    const outputPath = path.resolve(tmpRoot, name)
    logger.log(`Verified ${outputPath}`)
    return outputPath
  } catch (err) {
    logger.error(err)
    throw err
  }
}

const pull = async (benthos) => {
  const { name, data, checksums } = await get(benthos)
  verify(name, checksums, data)
  return { data, name }
}

const get = async (benthos) => {
  const root = `${benthos.src}/v${benthos.version}`
  const name = zipName(benthos)

  const [data, checksums] = await Promise.all([
    download(`${root}/${name}`),
    download(
      `${root}/${benthos.checksumPrefix}_${benthos.version}_checksums.txt`
    )
  ])

  return { name, data, checksums }
}

const verify = (name, checksums, data) => {
  const checksum = checksums
    .toString()
    .split('\n')
    .find((s) => s.endsWith(name))
    .split('  ')[0]

  const sha = crypto.createHash('sha256').update(data).digest('hex')
  if (checksum !== sha) {
    throw new Error(
      `Failed to verify sha256 for ${name}. Expected ${checksum}, got ${sha}`
    )
  }
}

const write = async (tmpRoot, name, data) => {
  const root = path.resolve(tmpRoot)
  const dst = path.resolve(root, name)
  await mkdirp(root)
  await fs.promises.writeFile(dst, data)
}
