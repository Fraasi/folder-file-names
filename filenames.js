#!/usr/bin/env node

const fs = require('fs')
const path = require('path');
const program = require('commander')
const pkg = require('./package.json')

program
  .version('Filenames v' + pkg.version)
  .option('-s, --save [filename]', 'save to .txt file (default: Filenames.txt)', /^(\w|\d)+(\.txt)$/)
  .option('-f, --files', 'list only files')
  .option('-d, --dirs', 'list only folders')
  .option('-a, --array', 'list files in an Array. Only in save, doesn\'t affect console. ')
  .option('-E, --no-ext', 'without extension')
  .option('-C, --no-console', 'don\'t print to console')
  .parse(process.argv);

const filesArr = []
function printAndPush(file, folderOrFile) {
    if (program.console) console.log('\x1b[33m', file, '\x1b[0m', folderOrFile.padStart(50 - file.length, '.'))
    if (program.array) filesArr.push(`"${file}",`)
    else filesArr.push(file)
}

fs.readdir(process.cwd(), (err, files) => {
  if (err) throw err
  
  files.forEach((file) => {
    const isDir = fs.lstatSync(file).isDirectory()
    const folderOrFile = isDir ? 'Folder' : 'File'

    if (!program.ext) {
      const ext = path.extname(file);
      file = path.basename(file, ext)	// = file.replace(ext, '')
    }

    if (program.files && !isDir) printAndPush(file, folderOrFile)
    else if (program.dirs && isDir) printAndPush(file, folderOrFile)
    else if (!program.files && !program.dirs) printAndPush(file, folderOrFile)
  })

  // program.save without -s = undefined,
  // -s = true,  / -s name.txt = name.txt
  if (program.save) {
    let fileName = 'Filenames.txt'
    if (typeof program.save === 'string') fileName = program.save
    if (program.array) {
      filesArr.unshift('[')
      filesArr.push(']')
    }
    fs.writeFile(fileName, filesArr.join('\n'), (err) => {
      if (err) throw err
      console.log('\x1b[33m', `File names have been written to ${fileName}!`, '\x1b[0m')
    })
  }
})
