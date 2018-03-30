const { resolve } = require('path')
const transformersFolder = __dirname + '/../transformers'
const importFromRenamedTranformPath = `${transformersFolder}/import-declaration-transform`
const importInRenamedTranformPath = `${transformersFolder}/import-relative-transform`
const jscodeshiftBinPath = require.resolve('jscodeshift/bin/jscodeshift.sh')

const getCodeShiftCommand = tranformPath => filesToRefactor => (
  prevFile,
  nextFile
) => [
  jscodeshiftBinPath,
  [
    filesToRefactor,
    // '--silent',
    // '-d',
    `-t ${require.resolve(tranformPath)}`,
    `--prevFilePath=${resolve(prevFile)}`,
    `--nextFilePath=${resolve(nextFile)}`
  ],
  { shell: true },
  nextFile
]

exports.getImportFromRenamedCommand = getCodeShiftCommand(
  importFromRenamedTranformPath
)

exports.getImportInRenamedCommand = getCodeShiftCommand(
  importInRenamedTranformPath
)
