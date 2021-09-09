import fs from 'fs'

export const loadJson = async (name) => {
  const data = await fs.promises.readFile(name)
  return JSON.parse(data)
}
