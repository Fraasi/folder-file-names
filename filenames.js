#!/usr/bin/env node

const fs = require('fs')
const path = require('path');
const program = require('commander')
const pkg = require('./package.json')

program
	.version('Filenames v' + pkg.version)
	.option('-s, --save [filename]', 'Save to .txt file (default: Filenames.txt)', /^(\w|\d)+(\.txt)$/)
	.option('-f, --files', 'List only files')
	.option('-d, --dirs', 'List only folders')
	.option('-a, --array', 'List files in an Array. Only in save, doesn\'t affect console. ')
	.option('-E, --no-ext', 'Without extension')
	.option('-C, --no-console', 'Don\'t print to console')
	.parse(process.argv);

	fs.readdir(process.cwd(), (err, files) => {
	if (err) throw err
	let fileName = 'Filenames.txt'
	let filesToSave = ''

	if (program.array) filesToSave += '[\n'

	files.forEach(file => {
		const isDir = fs.lstatSync(file).isDirectory()
		const FolderOrFile = isDir ? 'Folder' : 'File'

		if (!program.ext) {
			const ext = path.extname(file);
			file = path.basename(file, ext)	// = file.replace(ext, '')
		}
		if (program.files && !isDir) {
			filesToSave += program.array ? `'${file}',\n` : file + '\n'
			if (program.console) console.log('\x1b[33m', file, '\x1b[0m', FolderOrFile.padStart(50 - file.length, '.'))
		}
		if (program.dirs && isDir) {
			filesToSave += program.array ? `'${file}',\n` : file + '\n'
			if (program.console) console.log('\x1b[33m', file, '\x1b[0m', FolderOrFile.padStart(50 - file.length, '.'))
		}
		if ((program.rawArgs.length === 2 || !program.ext || program.save || program.array) && !program.files && !program.dirs) {
			filesToSave += program.array ? `'${file}',\n` : file + '\n'
			if (program.console) console.log('\x1b[33m', file, '\x1b[0m', FolderOrFile.padStart(50 - file.length, '.'))
		}
	})
	if (program.array) filesToSave += ']'

	// program.save without -s = undefined, using default = filenames.txt
	// -s = true,  / -s name.txt = name.txt
	if (program.save) {
		if (typeof program.save === 'string') fileName = program.save
		fs.writeFile(fileName, filesToSave, (err) => {
			if (err) throw err
			console.log('\x1b[33m', `File names have been written to ${fileName}!`, '\x1b[0m')
		})
	}
})
