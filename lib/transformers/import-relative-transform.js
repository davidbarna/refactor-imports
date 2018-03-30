const defaultParser = require('../parsers/default')
const transformersFolder = 'refactoring-codemods/lib/transformers'
const importInRenamedTranform = require(`${transformersFolder}/import-relative-transform`)

importInRenamedTranform.parser = defaultParser
module.exports = importInRenamedTranform
