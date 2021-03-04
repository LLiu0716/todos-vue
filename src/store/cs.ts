import { reactive, readonly } from 'vue'

export const createStore = () => {
	const state = reactive({
		counter: 0,
		list: [
			{ id: 1, name: 'xxx1', done: false },
			{ id: 2, name: 'xxx2', done: false },
			{ id: 3, name: 'xxx3', done: true },
			{ id: 6, name: 'xxx6', done: true },
			{ id: 4, name: 'xxx4', done: false },
			{ id: 7, name: 'xxx7', done: false },
			{ id: 5, name: 'xxx5', done: true }
		]
	})
	const increment = () => state.counter++

	return { increment, state: readonly(state) }
}
