# 项目说明

> vue 3 ts todos 和 vite 基本配置项使用介绍
>
> todos 基础页面放在了 `/assets/todos.xml`

## 项目配置

- 先安装依赖

  ```
  npm i
  ```

- 安装路由和 vuex

  > vite 默认只安装了 vue3+ , vue3+ 只支持最新的 vue-router 和 vuex

  ```
  npm i vuex@next
  npm i vue-router@next
  ```

- 安装 css 预处理器

  > 可不装 , 本项目使用的 less

  ```
  npm i less -D
  ```

- 添加 vite 配置项

  > 不配置也不影响使用 , 这里主要为了使用`/@/`来设置路径

  ```js
  // 根文件夹下新建一个 vite.config.ts 文件
  import { UserConfig } from 'vite'
  const path = require('path')
  const config: UserConfig = {
  	plugins: [], // react 会用的上 , 这里不需要
  	port: 8880, // 项目端口 不设置为默认端口
  	open: true, // 项目启动后自动打开浏览器
  	alias: {
  		// 别名
  		'/@/': path.resolve(__dirname, './src')
  	}
  	// 代理 , 处理跨域
  	// proxy: {
  	//   '/foo': ''
  	// }
  }

  export default config
  ```

- 配置 vue 模块类型

  > 心累 , 默认配置里居然没有 vue 模块的类型
  >
  > react 项目也需要配置 , 这里不做介绍

  ```ts
  // 加在 vue-app-env.d.ts 文件里
  declare module '*.vue' {
  	import type { DefineComponent } from 'vue'
  	const component: DefineComponent<{}, {}, any>
  	export default component
  }
  ```

- 项目基础配置好了 , 可以愉快的专注项目了

  > 注意 , 千万不要把 `index.html` 文件放到 `public` 文件夹里 , 要放进去需要另外配置 `vite.config.ts` 文件

## 创建项目基础结构

- view 视图文件夹

  > todos 项目只有一个页面 , 所有的组件都放在了这里

- store vuex

  > todos 数据共享

- route 路由

  > todos 底部 tab 状态栏 点击切换效果

- components 公共组件

  > 这里用不到

## 项目开始

> todos 项目特性 , 只需要用到根文件来做页面显示

- 先拿到需要的文本和 css 放到 App.vue

  > 文本在 `/assets/todos.xml` , css 为 `index.css`
  >
  > 注意标签位置
  >
  > ```html
  > <!-- App.vue  -->
  > <template>
  > 	<section class="todoapp">
  > 		<!-- 中间的内容 -->
  > 	</section>
  > </template>
  > ```

- 全局/组件内 注册需要的页面

  > 这里 2 种都演示一遍

- 头部组件

  > 全局异步组件
  >
  > ```html
  > <!-- TodoHeader.vue  -->
  > <template>
  > 	<header class="header">
  > 		<!-- 中间的内容 -->
  > 	</header>
  > </template>
  > ```

- 主体组件

  > 组件内部注册组件
  >
  > ```html
  > <!-- TodoContent.vue  -->
  > <template>
  > 	<section class="main">
  > 		<!-- 中间的内容 -->
  > 	</section>
  > </template>
  > ```

- 底部组件

  > 全局组件
  >
  > ```html
  > <!-- TodoFooter.vue  -->
  > <template>
  > 	<footer class="footer">
  > 		<!-- 中间的内容 -->
  > 	</footer>
  > </template>
  > ```
