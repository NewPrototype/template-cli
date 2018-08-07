#!/usr/bind/env node  //用于执行node命令
const fs = require('fs');

const program = require('commander');
const download = require('download-git-repo');
const chalk = require('chalk');
const symbols = require('log-symbols');
const handlebars = require('handlebars'); //模版文件下载

const ora = require('ora'); //提示下载

var inquirer = require('inquirer');  //提示文本

const package = require('./package.json'); //获取版本信息

const re = new RegExp("^[a-zA-Z]+$"); //检查文件名是否是英文，只支持英文

program
  .version(package.version, '-v,--version')
  .command('init <name>')
  .action(name => {
    if (!re.test(name)) {
      console.log(symbols.error, chalk.red('错误!请输入英文名称'));
      return 
    } 
    if (!fs.existsSync(name)) {
      inquirer
        .prompt([
          {
            type: 'list',
            name: 'type',
            message: '请选择模版类型?',
            choices: [
              'react-component------ES6组件',
              'react-function------函数组件',
              'react-redux------ES6组件',
            ],
          },
        ])
        .then(answers => {
          console.log(symbols.success,chalk.green('开始创建..........,请稍候'));
          const spinner = ora('正在下载模板...');
          spinner.start();
          const type = getType(answers)
          download(`github:NewPrototype/template/#${type}`, name, err => {
            if (err) {
              spinner.fail();
            } else {
              spinner.succeed();
              var files = fs.readdirSync(name);
              for(let i=0;i<files.length;i++){
                let fileName=`${name}/${files[i]}`;
                if(fs.existsSync(`${name}/${files[i]}`)){
                  const content = fs.readFileSync(fileName).toString();
                  const result = handlebars.compile(content)({template:name,});
                  fs.writeFileSync(fileName, result);
                }

              }
              let count = 0; //所有文件修改完成，提示
              for (let i = 0; i < files.length; i++) {
                if(files[i]=='index.js'||files[i]=='action.js'||files[i]=='reducer.js'||files[i]=='saga.js'){
                  continue
                }
                //获取文件列表
                var index = files[i].indexOf('.');
                fs.rename(
                  `${name}/${files[i]}`,
                  `${name}/${name}${files[i].substring(index)}`,
                  err => {
                    if (err) {
                      console.log('---错误');
                    }
                    count++;
                    if (count+1 == files.length) { //排除index.js文件
                      console.log(symbols.success, chalk.green('模版创建成功'));
                    }
                  }
                );
              }
            }
          });
        });
    } else {
      console.log(symbols.error, chalk.red('有相同名称模版'));
    }
  });

program.parse(process.argv);

const getType = (type) => {
  let str = 'master';
  switch (type.type) {
    case "react-component------ES6组件":
      str = "component"
      break;
      case "react-function------函数组件":
      str = "master"
      break;
      case "react-redux------ES6组件":
      str = "redux"
      break;
    default:
      break;
  }
  return str
}
