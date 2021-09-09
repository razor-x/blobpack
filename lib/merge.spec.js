import test from 'ava'

import { mergeArrayProps } from './merge.js'

test('mergeArrayProps', (t) => {
  t.deepEqual(
    mergeArrayProps(
      {
        foo: ['a'],
        bar: ['b'],
        baz: ['c', 'e'],
        blob: ['t']
      },
      {
        x: ['a'],
        y: ['b'],
        baz: ['c', 'd'],
        blob: ['z']
      }
    ),
    {
      foo: ['a'],
      bar: ['b'],
      x: ['a'],
      y: ['b'],
      baz: ['c', 'd', 'e'],
      blob: ['z', 't']
    }
  )
})
