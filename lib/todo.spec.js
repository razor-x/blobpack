import test from 'ava'

import { todo } from './todo.js'

test('todo: returns argument', async (t) => {
  t.true(todo(true), 'returns true')
  t.false(todo(false), 'returns false')
  t.is(todo('todo'), 'todo', 'returns string')
})
