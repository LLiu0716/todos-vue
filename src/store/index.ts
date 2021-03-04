import { createStore, MutationTree, ActionTree, StoreOptions } from 'vuex'

interface I_item {
	done: boolean
	name: string
	id: number
}

interface I_state {
	list: Array<I_item>
}

const state: I_state = {
	list: [
		{ id: 1, name: 'xxx1', done: false },
		{ id: 2, name: 'xxx2', done: false },
		{ id: 3, name: 'xxx3', done: true },
		{ id: 6, name: 'xxx6', done: true },
		{ id: 4, name: 'xxx4', done: false },
		{ id: 7, name: 'xxx7', done: false },
		{ id: 5, name: 'xxx5', done: true }
	]
}

const mutations: MutationTree<I_state> = {
	addItem(state, payload) {
		console.log(payload)
		state.list.unshift({
			id: Date.now(),
			name: payload.name,
			done: false
		})
	},
	delItem(state, papload) {
		if (papload.id) {
			state.list = state.list.filter(v => v.id != papload.id)
		} else {
			state.list = state.list.filter(v => v.done != true)
		}
	},
	updCheckedItem(state, papload) {
		const { id, done } = papload
		if (id) {
			state.list.forEach(v => {
				if (v.id == id) {
					v.done = !v.done
				}
			})
		} else {
			state.list.forEach(v => {
				v.done = done
			})
		}
	},
	updNameItem(state, papload) {
		const { id, name } = papload
		// for 循环性能更强 , 而且能 return
		// for (let i = 0; i < state.list.length; i++) {
		// 	if (state.list[i].id == id) {
		// 		state.list[i].name = name
		// 		return console.log('i', i)
		// 	}
		// }
		// forEach代码更简洁
		state.list.forEach(v => {
			if (v.id == id) {
				v.name = name
			}
		})
	},
	getTodoList(state, papload) {
		console.log('papload', papload)
	}
}

// 为什么不在 vuex 里做计算属性 ? 因为我不会啊 , 主要是 麻烦
const getters = {}
const store = createStore({
	state,
	getters,
	mutations,
	actions: {},
	modules: {}
})

export default store
