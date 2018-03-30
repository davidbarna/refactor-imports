const defaultParser = require('../parsers/default')
const transformersFolder = 'refactoring-codemods/lib/transformers'
const importFromRenamedTranform = require(`${transformersFolder}/import-declaration-transform`)

importFromRenamedTranform.parser = defaultParser
module.exports = importFromRenamedTranform
