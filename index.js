#!/usr/bind/env node  //用于执行node命令

const program = require('commander');
const download=require('download-git-repo');

const package = require('./package.json')

program.version(package.version, '-v,--version').command('init <name>').action((name)=>{
  console.log('输入名称为:',name)
  // download('')
})

program.parse(process.argv);