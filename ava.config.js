const isBabelRequired = () => {
  const [majorVer] = process.versions.node.split()
  return Number(majorVer) < 14
}

export default {
  files: ['**/*.spec.js', '!dist/**/*', '!package/**/*'],
  require: isBabelRequired() ? ['@babel/register'] : undefined
}
