import fs from 'fs'
import path from 'path'

import mkdirp from 'mkdirp'
import jsYaml from 'js-yaml'
import jszip from 'jszip'

import { loadConfig } from './config.js'
import { zipName } from './zip-name.js'
import { mergeArrayProps, mergeConfig } from './merge.js'

const { load: yamlLoad, dump: yamlDump } = jsYaml
const { loadAsync: zipLoadAsync } = jszip

const staticConfigName = 'config.yaml'

export const build = async ({
  configPath = 'package.json',
  tmpRoot = 'tmp',
  configRoot = 'config',
  resourcesRoot = '',
  distRoot = 'dist',
  logger = console
} = {}) => {
  try {
    const config = await loadConfig(configPath)

    const artifacts = await createArtifacts(config, {
      tmpRoot,
      configRoot,
      resourcesRoot,
      distRoot
    })

    for (const artifact of artifacts) {
      // eslint-disable-next-line no-console
      console.log(`Built artifact: ${artifact}`)
    }

    return artifacts
  } catch (err) {
    logger.error(err)
    throw err
  }
}

const createArtifacts = async (
  { name, version, platform, include = {}, artifacts = [] },
  { tmpRoot, configRoot, resourcesRoot, distRoot }
) => {
  if (!tmpRoot) throw new Error('Missing tmpRoot')
  if (!configRoot) throw new Error('Missing configRoot')
  if (!distRoot) throw new Error('Missing distRoot')

  const srcZipPath = path.resolve(tmpRoot, zipName({ name, version, platform }))
  const srcZipBuffer = await fs.promises.readFile(srcZipPath)
  const createArtifact = createArtifactFrom(
    srcZipBuffer,
    configRoot,
    resourcesRoot,
    distRoot
  )

  await mkdirp(path.resolve(distRoot))
  return Promise.all(artifacts.map(normalizeInput(include)).map(createArtifact))
}

const normalizeInput = (include) => (input) => {
  if (typeof input === 'string') return { name: input, ...include }
  const { name, ...rest } = input
  return {
    name,
    ...mergeArrayProps(rest, include)
  }
}

const createArtifactFrom =
  (srcZipBuffer, configRoot, resourcesRoot, distRoot) => async (artifact) => {
    const data = await loadArtifactConfig(configRoot, resourcesRoot, artifact)
    const artifactBuffer = await generateZipFrom(srcZipBuffer, [
      { name: staticConfigName, data }
    ])

    const outputName = `${artifact.name}.zip`
    const outputPath = path.resolve(distRoot, outputName)
    await fs.promises.writeFile(outputPath, artifactBuffer)
    return outputPath
  }

const loadArtifactConfig = async (
  configRoot,
  resourcesRoot,
  { name, ...rest }
) => {
  const resources = Object.entries(rest).reduce(reduceResources, [])

  const [config, resourceConfig] = await Promise.all([
    loadYaml(path.resolve(configRoot, `${name}.yaml`)),
    loadResources(resourcesRoot, resources)
  ])

  const data = mergeConfig(resourceConfig, config)
  return yamlDump(data)
}

const reduceResources = (accumulator, [root, names]) => {
  const paths = names
    .map((name) => path.join(...name.split('/')))
    .map((name) => path.join(root, name))
  return [...accumulator, ...paths]
}

const loadResources = async (resourcesRoot, resources) => {
  const loadResource = (name) =>
    loadYaml(path.resolve(resourcesRoot, `${name}.yaml`))
  const data = await Promise.all(resources.map(loadResource))
  return data.reduce(mergeConfig, {
    input_resources: [],
    cache_resources: [],
    rate_limit_resources: [],
    processor_resources: [],
    output_resources: []
  })
}

const loadYaml = async (name) => {
  const buf = await fs.promises.readFile(path.resolve(name))
  return yamlLoad(buf)
}

const generateZipFrom = async (srcZipBuffer, files = []) => {
  const zip = await zipLoadAsync(srcZipBuffer)

  for (const { name, data } of files) {
    zip.file(name, data, { unixPermissions: '644' })
  }

  return zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    platform: process.platform
  })
}
