import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

// 这里并不进行真正的路由 , 只是改变路由地址
import App from '../App.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/all'
	},
	{
		path: '/all',
		component: App
	},
	{
		path: '/active',
		component: App
	},
	{
		path: '/completed',
		component: App
	}
]

const router = createRouter({
	linkExactActiveClass: 'selected',
	history: createWebHashHistory(),
	routes
})

export default router
