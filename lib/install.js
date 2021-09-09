import crypto from 'crypto'
import fs from 'fs'
import path from 'path'

import download from 'download'
import mkdirp from 'mkdirp'

import { loadJson } from './load-json.js'

export const install = async ({
  configPath = 'package.json',
  tmpRoot = 'tmp',
  logger = console
} = {}) => {
  try {
    const { benthos } = await loadJson(configPath)
    const { data, name } = await pull(benthos)
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

export const zipName = (benthos) =>
  `${benthos.name}_${benthos.version}_${benthos.platform}.zip`

const get = async (benthos) => {
  const root = `${benthos.src}/v${benthos.version}`
  const name = zipName(benthos)

  const [data, checksums] = await Promise.all([
    download(`${root}/${name}`),
    download(`${root}/benthos_${benthos.version}_checksums.txt`)
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
