export default () => ({
  files: ['**/*.spec.js', '!dist/**/*', '!package/**/*'],
  ...isBabelRequired() ? { babel } : {}
})

const isBabelRequired = () => {
  const [majorVer] = process.versions.node.split()
  return Number(majorVer) < 14
}

const babel = true
