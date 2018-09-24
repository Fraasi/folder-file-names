# folder-file-names
A small node CLI script to print and/or save to file current folder filenames.  
Npm [link](https://www.npmjs.com/package/folder-file-names)  
Install globally to use it everywhere.

```
$ npm install -g folder-file-names  
$ filenames -h  
  
  Usage: filenames [options]

  Options:

    -V, --version          output the version number
    -s, --save [filename]  save to .txt file (default: Filenames.txt)
    -f, --files            list only files
    -d, --dirs             list only folders
    -a, --array            List files in an Array. Only in save, doesn't affect console.
    -E, --no-ext           without extension
    -C, --no-console       don't print to console
    -h, --help             output usage information  
```

Running just `filenames` without options will print the whole directory to console.  
Using `--save` flag, the text file will be saved to current folder.  

If you need the filenames in another program, you can use the `--array` flag to save the files in a javascript array format for easy copy pasting to your program.

Suggestions welcome. Open an issue if you have an idea to improve this.
