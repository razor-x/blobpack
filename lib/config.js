import fs from 'fs'

export const loadConfig = async (configPath) => {
  const { benthos, blobpack } = await loadJson(configPath)
  const config = blobpack ?? benthos

  if (!config) {
    throw new Error(
      `Cannot find key blobpack or benthos in config at ${configPath}`
    )
  }

  return config
}

export const loadJson = async (name) => {
  const data = await fs.promises.readFile(name)
  return JSON.parse(data)
}
