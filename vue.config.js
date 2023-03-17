const path = require('path');
const { userDev } = require('./src/utils/account');
const TimePlugin = require('./TimePlugin');
const { modifyVars } = require('wh-component/src/antdVars');
// function resolve(dir) {
//   return path.join(__dirname, dir);
// }
module.exports = {
  publicPath: './',
  devServer: {
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      // '/api/order': { target: userDev.orderapi, changeOrigin: true, pathRewrite: { '^/api/order': '' }, ws: false },
      // '/api/workflow': { target: userDev.wfApi, changeOrigin: true, pathRewrite: { '^/api/workflow': '' }, ws: false },
      // '/api/third-party': { target: userDev.thirdapi, changeOrigin: true, pathRewrite: { '^/api/third-party': '' }, ws: false },
      // '/api/service-manager': { target: userDev.api, changeOrigin: true, pathRewrite: { '^/api/service-manager': '' }, ws: false },
      // '/api/service-resource-manager': {
      //   target: userDev.api,
      //   changeOrigin: true,
      //   pathRewrite: { '^/api/service-resource-manager': '/api/aggregation/service-resource-manager' },
      //   ws: false,
      // },
      '/api/identify': { target: userDev.api, changeOrigin: true, ws: false },
      '/api': {
        target: userDev.api,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api/aggregation',
        },
        ws: false,
      },
    },
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: modifyVars('#3D6CEB', {
          '@y-radius-default': '4px',
          '@y-radius-left': '4px 0 0 4px',
          '@y-radius-right': '0 4px 4px 0',
        }),
      },
    },
  },

  // 修改 pages 入口
  pages: {
    index: {
      entry: 'examples/main.js', // 入口
      template: 'public/index.html', // 模板
      filename: 'index.html', // 输出文件
    },
  },
  parallel: false,
  configureWebpack: () => {
    return {
      plugins: [new TimePlugin()],
    };
  },

  // 扩展 webpack 配置
  chainWebpack: config => {
    config.resolve.alias.set('vue$', 'vue/dist/vue.esm.js');
    // @ 默认指向 src 目录，这里要改成 examples
    // 另外也可以新增一个 ~ 指向 packages
    config.resolve.alias
      .set('@', path.resolve('examples'))
      .set('@api', path.resolve('src/api/index'))
      .set('~', path.resolve('packages'))
      .set('@src', path.resolve('src'))
      .set('yuejizuo-form-making', path.resolve('packages/index'));

    config.module
      .rule('md')
      .test(/\.md$/)
      .use('html-loader')
      .loader('html-loader')
      .end()
      .use('markdown-loader')
      .loader('markdown-loader')
      .end();

    // 把 packages 和 examples 加入编译，因为新增的文件默认是不被 webpack 处理的
    config.module
      .rule('js')
      .include.add(/packages/)
      .end()
      .include.add(/examples/)
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        // 修改它的选项...
        return options;
      });
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(path.join(__dirname, './src/icons'))
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(path.join(__dirname, './src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end();
  },
};
