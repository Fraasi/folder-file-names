#!/usr/bin/env node

const fs = require('fs')
const path = require('path');
const program = require('commander')
const pkg = require('./package.json')

program
	.version(pkg.version)
	.option('-s, --save [filename]', 'save to .txt file (default: Filenames.txt)', /^(\w|\d)+(\.txt)$/)
	.option('-f, --files', 'list only files')
	.option('-d, --dirs', 'list only folders')
	.option('-E, --no-ext', 'without extension')
	.option('-C, --no-console', 'don\'t print to console')
	.parse(process.argv);

fs.readdir(process.cwd(), (err, files) => {
	if (err) throw err
	let fileName = 'Filenames.txt'
	let filesToSave = ''

	files.forEach(file => {
		const isDir = fs.lstatSync(file).isDirectory()
	
		if (!program.ext) {
			const ext = path.extname(file);
			file = path.basename(file, ext)	// = file.replace(ext, '')
		}
		if (program.files && !isDir) {
			filesToSave += file + '\n'
			if (program.console) console.log('\x1b[33m', file, '\x1b[0m', 'File'.padStart(50 - file.length, '.'))
		} 
		if (program.dirs && isDir) {
			filesToSave += file + '\n'
			if (program.console) console.log('\x1b[33m', file, '\x1b[0m', 'Folder'.padStart(50 - file.length, '.'))
		}
		if ( (program.rawArgs.length === 2 || !program.ext) && !program.files && !program.dirs) {
			filesToSave += file + '\n'
			const isFile = isDir ? 'Folder' : 'File'
			if (program.console) console.log('\x1b[33m', file, '\x1b[0m', isFile.padStart(50 - file.length, '.'))
		}
	})

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
