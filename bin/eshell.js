#!/usr/bin/env node
require('shelljs/global');
var fs = require('fs');
var path = require('path');
var async = require('async');
var Handlebars = require('handlebars');
var argv = require('yargs')
           .alias('s','scriptName')
           .alias('u','userName')
           .default({u: 'yuwancumian'})
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

//读取 package.json 的模板
function readPkg(cb) {
    fs.readFile(path.join(__dirname,'package.json'),'utf-8',function(err,data){
        if (err) throw err;
        pkg += data;
        cb(null,null);
    })
}


// 读取.gitignore 文件
function readIgnore(cb) {
    fs.readFile(path.join(__dirname,'gitignore'),'utf-8',function(err,data){
        if (err) throw err;
        ignore += data;
        cb(null,null)
    })
}

// 渲染模板
function replaceTxt(cb){
    var source = pkg;
    //初始化指定的模板引擎
    var template = Handlebars.compile(source);

    //初始化模板上下文
    var context = {
        projectName: projectName,
        userName: argv.u || 'yuwancumian',
        scriptName: scriptName
    }

    //用模板引擎执行上下文
    replace_pkg = template(context);
    cb(null,null)
}

//写入文件
function writePkg(cb){
    fs.writeFile('package.json',replace_pkg,function(err){
        if (err) throw err;
        console.log("Package.json was created!");
    }) 
    fs.writeFile('.gitignore',ignore,function(err){
        if (err) throw err;
        console.log("Gitignore was created!");
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
exec('git remote add origin git@github.com:yuwancumian/'+ projectName + '.git');


"#!/usr/bin/env node\n".to('index.js');
