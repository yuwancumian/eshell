#!/usr/bin/env node
require('shelljs/global');
var fs = require('fs');
var path = require('path');
var Promise = require('bluebird');
var Handlebars = require('handlebars');
var argv = require('yargs')
           .alias('s','scriptName')
           .alias('u','userName')
           .default({u: 'yourGithubUserName'})
           .usage('Usage: eshell [options]')
           .help('h','')
           .argv;

var series = [];
var pkg = '';
var replace_pkg = '';
var ignore = '';
var projectName = process.argv[2];
var scriptName = argv.s || process.argv[2];

if (!projectName  || projectName === ''){
    throw 'Project\'s name must be assigned!'
}

mkdir('-p',projectName);
cd(projectName);
"### Readme".to('README.md');

function readFile(file){
    return new Promise(function(resolve,reject){
        fs.readFile(file,function(err,data){
            if(err){
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

readFile(path.join(__dirname,'package.json'))
.then(function(data){
    console.log(data.toString())
    console.log('123123')
})
function writeFile(file,data){
    return new Promise(function(resolve,reject){
        fs.writeFile(file,data,function(err,data){
            if (err) throw err;
            console.log("was created!");
        })
    })
}

// readFile('test1.txt').then(writeFile('test1_copy.txt'))
readFile(path.join(__dirname,'package.json')).then(function(data){
    writeFile('test1_copy.txt',data)
}).catch(function(err){
    console.log(err);
})
