/* eslint no-console:0 */

const program = require('commander')
const { showError } = require('@s-ui/helpers/cli')
const { refactorImportsWithGitStatus } = require('../lib/index.js')

const cwd = process.cwd()
const helpMessage = `  Description:
    Refactors imports in all renamed files and imports that point to the file.
    Renamed files are retrieved from git status commands.
    Example: if src/foo.js has been renamed to src/new/path/to/foo.js
      import foo from './foo'; becomes import foo from './new/path/to/foo';

  Examples:
  $ refactor-imports .
  $ refactor-imports src test`

program
  .usage('<file ...>', 'src')
  .on('--help', () => console.log(helpMessage))
  .parse(process.argv)

refactorImportsWithGitStatus(program.args.join(' ')).catch(showError)
