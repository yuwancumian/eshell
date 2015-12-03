#!/usr/bin/env node
require('shelljs/global');
var fs = require('fs');
var path = require('path');
var async = require('async');
var series = [];
var pkg = '';
var ignore = '';
var shellScript = process.argv[2];
var scriptName = process.argv[3] || process.argv[2];

if (!shellScript){
    throw 'Path must be assigned!'
}

console.log("123")
mkdir('-p',shellScript);
cd(shellScript);
"### Readme".to('README.md');

function readPkg(cb) {
    fs.readFile(path.join(__dirname,'package.json'),'utf-8',function(err,data){
        if (err) throw err;
        pkg += data;
        cb(null,null);
    })
}

function readIgnore(cb) {
    fs.readFile(path.join(__dirname,'gitignore'),'utf-8',function(err,data){
        if (err) throw err;
        ignore += data;
        cb(null,null)
    })
}

function replaceTxt(cb){
    pkg = pkg.replace(/shellscript/g,shellScript);
    pkg = pkg.replace(/scriptname/g,scriptName);
    cb(null,null)
}

function writePkg(cb){
    cd('..')
    fs.writeFile('package.json',pkg,function(err){
        if (err) throw err;
    }) 
    fs.writeFile('.gitignore',ignore,function(err){
        if (err) throw err;
    })
    cb(null,null)
}

series.push(readPkg);
series.push(readIgnore);
series.push(replaceTxt);
series.push(writePkg);

async.series(series,function(err,cb){
    if (err) throw err;
});

exec('git init');
exec('git remote add origin git@github.com:yuwancumian/'+ shellScript + '.git');


mkdir('-p','bin');
cd('bin');
"#!/usr/bin/env node\n".to(scriptName + '.js');
"require('shelljs/global');".toEnd(scriptName + '.js');
echo(shellScript + ' was created!');
    console.log("Path must be ")
