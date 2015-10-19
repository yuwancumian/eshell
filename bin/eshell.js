#!/usr/bin/env node
require('shelljs/global');
var fs = require('fs');
var path = require('path');

var shellScript = process.argv[2];
var scriptName = process.argv[3] || process.argv[2];

mkdir('-p',shellScript);
cd(shellScript);
var pkg = fs.readFileSync(path.join(__dirname,'package.json'),'utf-8');
var giti = fs.readFileSync(path.join(__dirname,'gitignore'),'utf-8');
pkg = pkg.replace(/shellscript/g,shellScript);
pkg = pkg.replace(/scriptname/g,scriptName);
fs.writeFileSync('package.json',pkg);
fs.writeFileSync('.gitignore',giti);
"### Readme".to('README.md');

exec('git init');
exec('git remote add origin git@github.com:yuwancumian/'+ shellScript + '.git');


mkdir('-p','bin');
cd('bin');
"#!/usr/bin/env node\n".to(scriptName + '.js');
"require('shelljs/global');".toEnd(scriptName + '.js');
echo(shellScript + ' was created!');
