#!/usr/bin/env node
require('shelljs/global');
var pkg = require('../lib/package.json');

var shellScript = process.argv[2];
var scriptName = process.argv[3] || process.argv[2];


mkdir('-p',shellScript);
cd(shellScript);
JSON.stringify(pkg, null, 4).to('package.json');
"### Readme".to('README.md')

//sed('-i','shellScript', shellScript, 'package.json');
//sed('-i','scriptName', scriptName, 'package.json');


mkdir('-p','bin');
mkdir('-p','lib');
cd('bin');
"#!/usr/bin/env node\n".to(scriptName + '.js');
"require('shelljs/global');".toEnd(scriptName + '.js');
echo(shellScript + ' was created!');
