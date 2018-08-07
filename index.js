#!/usr/bind/env node  //用于执行node命令

const program = require('commander');
const download=require('download-git-repo');

const ora = require('ora');


const package = require('./package.json')

program.version(package.version, '-v,--version').command('init <name>').action((name)=>{
  console.log('输入名称为:',name)
  const spinner = ora('正在下载模板...');
  spinner.succeed();

  download('github:NewPrototype/template-cli/#master',name,(err)=>{
    console.log(err,'-----')
    if(!err){
      spinner.succeed();
    }else {
      spinner.fail();
    }
  })
})

program.parse(process.argv);