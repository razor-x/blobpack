#!/usr/bin/env node

import { build, install } from '../index.js'

const cmd = process.argv[2]

if (cmd === 'install') await install()
if (cmd === 'build' || cmd == null) await build()
