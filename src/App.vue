<template>
  <section class="todoapp">
    <!-- 头部 -->
    <TodoHeader @addTodo="addTodo" />
    <!-- 这2种写法一模一样 , 我更喜欢前面的大写 , 一目了然 -->
    <!-- <todo-header /> -->
    <!-- 主体 -->
    <TodoContent
      :list="listContent"
      :checked="checked"
      @delTodo="delTodo"
      @upCheckedTodo="upCheckedTodo"
      @upNameTodo="upNameTodo"
    />
    <!-- 底部 -->
    <TodoFooter
      :item="item"
      @delTodo="delTodo"
      :clearItem="clearItem"
      :show="state.list.length"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

import { createStore } from './store/cs'

// import TodoHeader from './view/TodoHeader.vue'
import TodoContent from './view/TodoContent.vue'
// import TodoFooter from './view/TodoFooter.vue'

interface I_item {
  done: boolean
  name: string
  id: number
}

interface I_state {
  list: Array<I_item>
}

export default defineComponent( {
  name: 'App',
  components: { TodoContent },
  setup () {
    // 我草 , 居然没有类型推断
    const state: I_state = useStore().state
    const commit = useStore().commit

    const data = reactive( {
      list: [] as Array<I_item>,  // 类型断言
      ider: -1,
      value: ''
    } )

    const statt = createStore().state

    // 生命周期函数
    onMounted( () => {
      console.log( 'statt', statt.counter )
      statt.counter = 1
    } )

    const route = useRoute()

    // 计算属性
    const checked = computed( () => {
      return state.list.every( v => v.done )
    } )

    // 计算属性
    const item = computed( () => {
      const num = state.list.filter( v => !v.done )
      return num.length
    } )

    // 计算属性
    const clearItem = computed( () => {
      const num = state.list.filter( v => v.done )
      return num.length
    } )

    // 计算属性
    const listContent = computed( () => {
      switch ( route.path ) {
        case '/active':
          return state.list.filter( v => v.done != true )
        case '/completed':
          return state.list.filter( v => v.done == true )
        default:
          return state.list
      }
    } )

    const addTodo = ( name: string ) => {
      commit( 'addItem', { name } )
    }

    const delTodo = ( id: number ) => {
      commit( 'delItem', { id } )
    }

    const upCheckedTodo = ( id: number, done: boolean ) => {
      // id = 0 , 说明为全部修改
      commit( 'updCheckedItem', { id, done } )
    }

    const upNameTodo = ( id: number, name: string ) => {
      commit( 'updNameItem', { id, name } )
    }

    return {
      // toRefs 将数据包装为双向绑定
      ...toRefs( data ),
      state,
      addTodo,
      delTodo,
      upCheckedTodo,
      upNameTodo,
      listContent,
      route,
      checked,
      clearItem,
      item,
      createStore
    }
  }
} )
</script>
