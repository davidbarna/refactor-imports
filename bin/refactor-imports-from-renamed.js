/* eslint no-console:0 */

const program = require('commander')
const path = require('path')
const { showError } = require('@s-ui/helpers/cli')
const { refactorImportsFromRenamedWithGitStatus } = require('../lib/index.js')

const cwd = process.cwd()
const helpMessage = `  Description:
    Refactors all imports that refer to renamed files.
    Renamed files are retrieved from git status commands.
    Example: if src/foo.js has been renamed to src/new/path/to/foo.js
      import foo from './foo'; becomes import foo from './new/path/to/foo';

  Examples:
  $ refactor-imports from-renamed .
  $ refactor-imports from-renamed src test`

program
  .usage('[options] <file ...>')
  .on('--help', () => console.log(helpMessage))
  .parse(process.argv)

refactorImportsFromRenamedWithGitStatus(program.args.join(' ')).catch(showError)
