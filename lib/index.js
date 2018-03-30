require('colors')
const { spawnList } = require('@s-ui/helpers/cli')
const { getRenamedFilesFromGitStatus } = require('./utils/git')
const {
  getImportFromRenamedCommand,
  getImportInRenamedCommand
} = require('./utils/commands')

const refactorImportsFromRenamed = renamedFiles => async filesToRefactor => {
  const commands = renamedFiles.map(({ from, to }) =>
    getImportFromRenamedCommand(filesToRefactor)(from, to)
  )
  console.log(
    `\nRefactoring all imports pointing to ${commands.length} renamed files:`
      .cyan
  )
  return spawnList(commands, {}, 15)
}

const refactorImportsInRenamed = renamedFiles => async () => {
  const commands = renamedFiles.map(({ from, to }) =>
    getImportInRenamedCommand(to)(from, to)
  )
  console.log(`\nRefactoring imports in ${commands.length} renamed files:`.cyan)
  return spawnList(commands, {}, 15)
}

exports.refactorImportsFromRenamedWithGitStatus = async filesToRefactor => {
  const renamed = await getRenamedFilesFromGitStatus()
  return refactorImportsFromRenamed(renamed)(filesToRefactor)
}

exports.refactorImportsInRenamedWithGitStatus = async () => {
  const renamed = await getRenamedFilesFromGitStatus()
  return refactorImportsInRenamed(renamed)()
}

exports.refactorImportsWithGitStatus = async filesToRefactor => {
  const renamed = await getRenamedFilesFromGitStatus()
  const commandFuncs = [
    () => refactorImportsInRenamed(renamed)(),
    () => refactorImportsFromRenamed(renamed)(filesToRefactor)
  ]

  return commandFuncs.reduce(
    (promise, func) => promise.then(func),
    Promise.resolve()
  )
}
