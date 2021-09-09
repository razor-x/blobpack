import path from 'path'

import test from 'ava'

import { loadJson } from '../index.js'

test('loadJson', async (t) => {
  const input = path.join('fixtures', 'foo.json')
  const data = await loadJson(input)
  t.deepEqual(data, { foo: 'bar' })
})
