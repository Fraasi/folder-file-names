#!/usr/bin/env node

const fs = require('fs')
const program = require('commander')
const pkg = require('./package.json')

program
	.version(pkg.version)
	.option('-s, --save [filename]', 'save to .txt file (default: Filenames.txt)', /^(\w|\d)+(\.txt)$/)
	.option('-E, --no-ext', 'without extension')
	.option('-C, --no-console', 'don\'t print to console')
	.parse(process.argv);

// if (process.argv.length <= 2) program.help()

console.log('s', (program.save !== true && program.save !== undefined) )
console.log('s', program.save)
console.log('C', program.console)
console.log('E', program.ext)

fs.readdir(process.cwd(), (err, files) => {
	if (err) throw err
	let fileName = 'Filenames.txt'
	let filesToSave = ''

	files.forEach(file => {
		if (!program.ext) {
			file = file.replace(/\.\w+$/, '')
		}
		if (program.console) console.log('\x1b[33m', file, '\x1b[0m')
		filesToSave += file + '\n'
	})

	if (program.save) {
		if (typeof program.save === 'string') fileName = program.save
		fs.writeFile(fileName, filesToSave, (err) => {
			if (err) throw err
			console.log('\x1b[33m', `The file names have been written to ${fileName}!`, '\x1b[0m')
		})
	}
})

