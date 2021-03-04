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
      :show="list.length"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from 'vue'
import { useRoute } from 'vue-router'

// import TodoHeader from './view/TodoHeader.vue'
import TodoContent from './view/TodoContent.vue'
// import TodoFooter from './view/TodoFooter.vue'

interface I_item {
  done: boolean
  name: string
  id: number
}

export default defineComponent( {
  name: 'App',
  components: { TodoContent },
  setup () {

    const data = reactive( {
      list: [
        { id: 1, name: 'xxx1', done: false },
        { id: 2, name: 'xxx2', done: false },
        { id: 3, name: 'xxx3', done: true },
        { id: 4, name: 'xxx4', done: false },
        { id: 5, name: 'xxx5', done: true }
      ] as Array<I_item>,  // 类型断言
      ider: -1,
      value: ''
    } )

    const route = useRoute()

    // 计算属性
    const checked = computed( () => {
      return data.list.every( v => v.done )
    } )

    // 计算属性
    const item = computed( () => {
      const num = data.list.filter( v => !v.done )
      return num.length
    } )

    // 计算属性
    const clearItem = computed( () => {
      const num = data.list.filter( v => v.done )
      return num.length
    } )

    // 计算属性
    const listContent = computed( () => {
      switch ( route.path ) {
        case '/active':
          return data.list.filter( v => v.done != true )
        case '/completed':
          return data.list.filter( v => v.done == true )
        default:
          return data.list
      }
    } )

    const addTodo = ( name: string ) => {
      console.log( 'name', name )
      data.list.unshift( {
        id: Date.now(),
        name,
        done: false
      } )
    }

    const delTodo = ( id: number ) => {
      if ( id ) {
        data.list = data.list.filter( v => v.id != id )
      } else {
        data.list = data.list.filter( v => v.done != true )
      }
    }

    const upCheckedTodo = ( id: number, done: boolean ) => {
      // id = 0 , 说明为全部修改
      if ( id ) {
        // if ( id != 0 ) {
        data.list.forEach( v => {
          if ( v.id == id ) {
            v.done = !v.done
          }
        } )
      } else {
        data.list.forEach( v => {
          v.done = done
        } )
      }
    }

    const upNameTodo = ( id: number, name: string ) => {
      data.list.forEach( v => {
        if ( v.id == id ) {
          v.name = name
        }
      } )
    }

    return {
      // toRefs 将数据包装为双向绑定
      ...toRefs( data ),
      addTodo,
      delTodo,
      upCheckedTodo,
      upNameTodo,
      listContent,
      route,
      checked,
      clearItem,
      item
    }
  }
} )
</script>
