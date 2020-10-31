import { todo } from '../index.js'

export default ({ log }) => async (check = true) => {
  log.debug({ check }, 'Input')
  const result = todo(check)
  if (!result) throw new Error('Check was not truthy.')
  return result
}
