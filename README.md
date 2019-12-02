##### 前言 写项目的时候，每次写组件的时候都需要重新新建 js,js 里面需要写重复的代码，所以就想偷个懒，然后写了一个根据命令生成组件的 npm 包

##### 安装方法

```
npm i template-react-cli -g
```

#### 使用方法

```
temp init 模块名称 test1 
```

比如: temp init Header

#### 流程

- temp init Header
- 终端中会提示请选择模版类型?
- 模版类型有 5 种,选择相应的组件类型(下面有类型说明)
- 然后就等待下载模版
- 终端提醒模版创建成功,流程结束

#### 组件类型说明

- react-component------ES6 组件:包含生命周期的 React.Component 组件
- react-function------函数组件:纯函数组件
- react-redux------ES6 组件:包含生命周期的 React.Component 组件并且包含 redux 配置组件
- react-function-typescript------typescript  函数组件    typescript 函数组件:纯函数组件
- react-component-typescript------typescript ES6组件 typescript ES6 组件:包含生命周期的 React.Component 组件

#### 组件模版地址:https://github.com/NewPrototype/template 
#### 完成脚手架地址:https://github.com/NewPrototype/webpack4-es6-react

#### npm发布流程

- 在https://www.npmjs.com/中注册账号(如果有请忽略)
- npm adduser 相应输入用户名，密码，邮箱
- npm version patch 修改版本号（修改过后需要改版本号，如果不修改版本号会报错）
- npm publish 就可以看到提交了（只支持npm提交，如果用了淘宝镜像注意切换）





