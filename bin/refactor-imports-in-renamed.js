/* eslint no-console:0 */

const program = require('commander')
const path = require('path')
const { showError } = require('@s-ui/helpers/cli')
const { refactorImportsInRenamedWithGitStatus } = require('../lib/index.js')

const cwd = process.cwd()
const helpMessage = `  Description:
    Refactors all imports in renamed files.
    Renamed files are retrieved from git status commands.
    Example: if src/foo.js has been renamed to src/new/path/to/foo.js
      import bar from './src/new/path/to/bar'; becomes import bar from './bar';

  Examples:
  $ refactor-imports in-renamed`

program
  .usage('[options]')
  .on('--help', () => {
    console.log(helpMessage)
  })
  .parse(process.argv)

refactorImportsInRenamedWithGitStatus().catch(showError)
