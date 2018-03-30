#!/usr/bin/env node

const program = require('commander')
const pkg = require('../package.json')
const version = pkg.version

program.version(version, '    --version')

program.command('default', 'Fix all imports from renamed files and in them.', {
  isDefault: true
})

program.command(
  'from-renamed',
  'Refactor imports pointing to renamed files in other files.'
)

program.command(
  'in-renamed',
  'Refactor imports to other files in remaned files.'
)

program.parse(process.argv)
