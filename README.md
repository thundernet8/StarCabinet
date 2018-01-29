[![Build Status](https://travis-ci.org/thundernet8/StarCabinet.svg?branch=master)](https://travis-ci.org/thundernet8/StarCabinet)
[![Appveyor Build status](https://ci.appveyor.com/api/projects/status/2hpsvxeamqegjkn1?svg=true)](https://ci.appveyor.com/project/thundernet8/starcabinet)
![React](https://camo.githubusercontent.com/aa1a90473e82b96ff3b11559cd4b55d50714f06c/68747470733a2f2f7261776769742e636f6d2f616c65656e34322f6261646765732f6d61737465722f7372632f72656163742e737667)
![Redux](https://camo.githubusercontent.com/f763782a28d7a14ce28f8721367002b824be4540/68747470733a2f2f7261776769742e636f6d2f616c65656e34322f6261646765732f6d61737465722f7372632f72656475782e737667)
![Github](https://camo.githubusercontent.com/2cdddb4559067bfe3723a7c97804f3dfda8fee4b/68747470733a2f2f7261776769742e636f6d2f616c65656e34322f6261646765732f6d61737465722f7372632f6769746875622e737667)

## StarCabinet

基于 React/Electron/Ant Design 打造的开源 Github Stars 管理的跨平台工具

## Features

* 归类

    * 按自带的语言分类 📚
    * 自定义添加分类 💼

* 标记

    * 添加仓库的标签 🏷
    * 添加仓库的旗标 🏁
    * 添加仓库的阅读状态 👀
    * 添加仓库的备注 ✍️
    * 添加仓库的评分 💯

* 筛选

    * 归类 🎏->选择语言或者分类
    * 搜索词 🔍->全部字段|仓库名|仓库原始描述|仓库备注|仓库标签
    * 排序〽️->默认(即 star 添加时间)|stars 数量|forks 数量|watchers 数量|创建时间|更新时间|推送时间|评分|大小|open issues 数量，均支持增序和降序
    * 过滤器 ⏳->未读|有旗标|有备注 三种可多选

* 离线支持
  💾 利用 rxdb 库和浏览器的 indexed db 存储仓库的数据

    * 支持离线查看仓库并支持上述所有功能操作，包括 readme 文件的查看
    * 高效的数据条件化呈现(不用频繁请求服务器)

* 数据
  支持 Stars 和自定义数据的导出备份和导入恢复

## Screenshots

![Login](screenshots/StarCabinet-login.png)

![Main](screenshots/StarCabinet-main.png)

![Setting](screenshots/StarCabinet-setting.png)

## Demo

[StarCabinet Demo](http://7xrp00.com1.z0.glb.clouddn.com/starcabinet/StarCabinet.mp4)

## Debug

直接使用源码的用户，按如下操作:

```
npm install
npm run dev
npm start
```

如果在 install packages 出错，提示 keytar 错误等信息，特别是 windows 用户，你可能需要安装 windows-build-tools 的 package 之后在进行上述步骤

或者尝试如下操作:

```
npm run rebuild
```

或者调试

```
npm install -g --verbose electron
```

## LICENSE

### MIT
