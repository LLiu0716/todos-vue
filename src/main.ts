import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'
import './index.css'

import route from './route'
import store from './store'

import TodoFooter from './view/TodoFooter.vue'

createApp(App)
	// 全局指令 获取焦点
	.directive('focus', {
		beforeMount(el, binding, vnode) {
			// console.log('beforeMount , 观察它的执行时机')
		},
		mounted(el) {
			el.focus()
			// console.log('mounted , 观察它的执行时机')
		},
		beforeUpdate(el) {
			// console.log('beforeUpdate , 观察它的执行时机')
		},
		updated(el) {
			el.focus()
			// console.log('updated , 观察它的执行时机')
		},
		beforeUnmount(el) {
			// console.log('beforeUnmount , 观察它的执行时机')
		},
		unmounted(el) {
			// console.log('unmounted , 观察它的执行时机')
		}
	})
	// 全局组件
	.component('TodoFooter', TodoFooter)
	// 无配置项异步组件
	.component(
		'TodoHeader',
		defineAsyncComponent(() => import('./view/TodoHeader.vue'))
	)
	// 有配置项异步组件
	// .component(
	// 	TodoContent',
	// 	defineAsyncComponent({
	//  // 异步组件地址
	// 		loader: () => import('./view/TodoHeader.vue'),
	// 		delay: 200,
	//  // 组件加载等待时间
	// 		timeout: 3000,
	//  // 组件加载错误显示项
	// 		errorComponent: () => import('./view/TodoHeader.vue'),
	//  // 组件等待加载显示项
	// 		loadingComponent: () => import('./view/TodoHeader.vue')
	// 	})
	// )
	.use(route)
	.use(store)
	.mount('#app')
