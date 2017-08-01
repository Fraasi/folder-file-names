var fs = require('fs');

var fileType = true;
var save = false;
var fileName = 'Filenames';

if (process.argv[2] == '-help') {
	console.log(`Arguments to use:
  -wo = without file type
  -save = save to file
  If argument after -save is abc, file names will be saved to abc.txt
  .txt will be added automatically.
  If no argument after -save, the default file to save is 'Filenames.txt'
  -help = this.help`);
	return;
};

if (process.argv[2] == '-wo' || process.argv[3] == '-wo') {
	fileType = false;
};

if (process.argv[2] == '-save' || process.argv[3] == '-save') {
	console.log('\x1b[33m', 'Saving...', '\x1b[0m');
	save = true;
	if (process.argv[process.argv.indexOf('-save') + 1]) {
		fileName = process.argv[process.argv.indexOf('-save') + 1];
	}
};

fs.readdir(process.cwd(), (err, files) => {
	files.forEach( file => {
		if (!fileType) {
			file = file.replace(/\.\w+$/, '');
		}
		if (save) {
			fs.appendFile(fileName+'.txt', file+'\n', (err) => {
				if (err) throw err;
			});
		}
		console.log(file);
	});
	if (save) {console.log('\x1b[33m', `The file names have been written to ${fileName}.txt!`, '\x1b[0m');}
});