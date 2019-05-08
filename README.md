# online-store

> 网上商城

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
引入网站icon小图标，在webpack.dev.conf.js 配置：一般就放在static文件夹下，防止项目打包上线出现找不到的问题
 new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      favicon: 'static/favicon.ico',//这里
    }),
    在index.html配置：
    <link rel="shortcut icon" href="static/favicon.ico" type="image/x-icon">
    href：路径

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
