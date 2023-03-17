# yuejizuo-form-making

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Run your unit tests

```
yarn test:unit
```

### Run your end-to-end tests

```
yarn test:e2e
```

### Lints and fixes files

```
yarn lint
```
### npm 依赖包

```
npm i --save react@latest
```

### yarn 依赖包

```
yarn add react@latest
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 安装 gulp

yarn add gulp gulp-autoprefixer gulp-clean-css gulp-less gulp-rename --dev 测试没有成功！

## 打包上传 npm 流程

1. 修改更新版本
   - 在 package.json 里 version 将版本号改为 0.0.1，等我们做完了再改成 1.0.0
2. 执行 npm run lib 或者 yarn run lib
3. 维护 README.md 的更新日志
4. 如果第一次上传 npm

   - npm config set registry http://192.168.100.10:31445/repository/npmhosted.org/
   - 在命令行中登录 npm login

   ```
    name:deployer
    password:deployer
    email: 随意(建议用公司邮箱)
   ```

5. 发布 npm publish
6. npm push

### npm run lib

这条命令会生成一个 lib 文件夹，将所有的组件打包。然后 npm publish 发布到 npm 仓库。

### npm run pack

这条命令会在本地生成一个.tgz 的文件。执行 cnpm i /path/to/xxx.tgz 文件就可以在本地安装并测试自己封装的组件库了。

<div id="myLog">

## 更新日志

### 1.0.0

2022-09-17

-- 发布第一版自定义表单插件

### 1.0.1

2022-09-19/2022-09-20

-- 所有组件都要支持逻辑表单；自定义选项新增label设置；解决组合组件回显问题；解决计数器format问题；解决组合组件按钮事件无效问题；解决渲染组件组合组件复制新增时子表单用同个组件问题；自增项的添加按钮变成删除按钮，且名称自动排序；去除wh-component，不自动全局依赖

### 1.0.2

2022-09-26

-- 生产环境请求添加/aggregation；解决单行文本占位提示未勾选也能显示；计数器添加布局配置；计数器添加占位提示；输入框增加字数限制配置；解决单选框组件选择数据关联表表头显示uuid

### 1.0.3

2022-09-30

-- 添加数据数据关联表数据关联功能；计数器添加自增时字数限制；

### 1.0.4

2022-10-01

-- 修改聚合层路径为aggregation；新增上传附件组件；添加隐藏和禁用操作属性；新增常用组件办理意见；解决复选框报错，复选框支持数组双向绑定；下拉选择添加是否多选；添加宽度设置配置；单选多选支持换行；审核意见支持宽度调整；数据关联时监听options变化才修改initOptions；常用组件的参考意见添加参考意见的组件标识

### 1.0.5

2022-10-02/2022-10-03
-- 添加initForm回调函数；initForm支持传入默认的表单值用于回显数据；添加formInit控制渲染组件默认是否调用initForm；添加印章名称业务组件；添加工单回填业务组件；fix-31020，解决上传成功的附件没有在页面展示问题

### 1.0.6

2022-10-07/2022-10-09
-- 完成工单回填组件；数据关联只能下标在前面控制后面的；完成指派实施组中的指派实施组和解决部分问题

### 1.0.7

2022-10-10/2022-10-13
-- 完成最新的逻辑表单规则，不兼容之前的逻辑表单规则；解决自定义选项被字典项冲突掉问题

### 1.0.8

2022-10-15
-- 完成数据关联表功能；设计表单中间区域支持滚动；把关系表数据清空，避免数据太大后端服务报错；

### 1.0.9

2022-10-18
-- 修改滚动样式；解决数据关联问题，数据关联后默认选第一个；工单上传添加提示

### 1.0.10

2022-10-21
-- 表单设计逻辑表单选择后回显示数据；新增审核结果业务组件；设计表单空数据时显示背景图；开关支持逻辑表单规则

### 1.0.11

2022-10-27
-- 按需求调整组件配置（删除一些配置）；审批意见查用户常用语

### 1.0.12

2022-11-02
-- 单选多选纵向布局时，宽度超出问题；解决日期默认值不能为空问题；解决计时器失去焦点没有触发计时器自带格式校验问题；

### 1.0.13

2022-11-04/2022-11-07
-- 完成表格组件；解决逻辑表单隐藏占位问题；逻辑表单显示隐藏，没有值的时候恢复默认值；解决表格初始值为nodata问题；完成私网地址抽屉

### 1.0.14

2022-11-07
-- 抽取样式到less文件，修改样式引入方式；

### 1.0.15

2022-11-17
-- 新增标题和分割线组件

## contributor
- luohongxin <kami126@aliyun.com>

</div>

