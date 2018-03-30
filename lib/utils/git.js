const git = require('simple-git')

exports.getRenamedFilesFromGitStatus = async () =>
  new Promise((resolve, reject) => {
    git().status(function(err, summary) {
      err && reject(err)
      resolve(summary.renamed)
    })
  })
