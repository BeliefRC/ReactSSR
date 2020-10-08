# 支持ssr的react项目


## 一.项目运行

```
git clone https://github.com/BeliefRC/ReactSSR.git  //clone项目
npm i  //安装依赖
npm run  dev//项目运行
```
## 二.目录结构
```
    ReactSSR
    	public/
    	src/
    		clinet/                  客户端相关代码
    		components/       公共组件代码
    		containers/          路由页面
    		server/                 服务端代码，根据路由渲染不同页面，接口转发
    		store/                   redux单一状态树
    		App.js
    		Routers.js            路由配置文件
    		config.js
    		withStyle.js
   	 package.json
		.babelrc
		webpack.base.js      webpack公共基础配置
		webpack.client.js     客户端webpack配置
		webpack.server.js    服务端webbpack配置
    	README.md
 ```
## 三.使用到的技术栈

1. 在`server/**js` 中使用express创建http服务
	- 使用`express.static`将public目录作为静态资源服务目录
	- 使用`express-http-proxy`做代理转发
	- 使用`react-dom/server`中的`renderToString`方法将组件转换成html字符串
	- 路由组件中使用`StaticRouter`代替传统的`BrowserRouter`或`HashRouter`,并且传入`location`属性（当前路由地址）、`context`属性（全局上下文数据）
	- 使用`react-router-config`提供的`renderRoutes`方法，渲染出不同路由对应的页面
	- 在`window.context`上挂载store数据，实现数据的注水，达到客户端，服务端的状态统一

2. 客户端相关代码
	- 使用`ReactDom.hydrate`代替`ReactDom.render`方法
	- 由于`componentDidMount`在服务端无法执行，所以添加`loadData`**静态方法**，在服务端渲染时，会检查组件中是否含有该方法，从而达到发送请求等相关目的

3. store及相关配置
	- 提供`getStore`和`getClientStore`两个方法，分别为生成服务端及客户端store代码
	- 两个方法中使用了`redux-thunk`中间件，并且运用到了`thunk.withExtraArgument`方法闯入了不同的axios实例
	- 两个不同的axios实例（request方法）的主要区别是baseUrl配置不同

4. webpack配置
	- 除了配置基本的entry、output、loader外，需要注意的是`webpack.server.js`中需要配置target为node，并且加以下代码，目的是不打包node的相关代码
 
 ```javascript
const nodeExternals = require('webpack-node-externals')
const serverConfig = {
	//其他配置....
	externals: [nodeExternals()]
	//其他配置....
}
```
