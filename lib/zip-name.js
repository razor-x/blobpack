export const zipName = (benthos) => {
  const { name, version, platform } = benthos
  return `${[name, version, platform].filter((x) => !!x).join('_')}.zip`
}
