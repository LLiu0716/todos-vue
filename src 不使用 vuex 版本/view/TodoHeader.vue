<template>
  <!-- 头部 -->
  <header class="header">
    <h1>todos</h1>
    <input
      class="new-todo"
      placeholder="What needs to be done?"
      v-focus
      autoFocus
      @blur="addTodo"
      @keyup.enter="(e) => e.target.blur()"
    />
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent( {
  setup ( props, context ) {
    const addTodo = ( e: any ) => {
      const value: string = e.target.value.trim()
      if ( value ) {
        context.emit( 'addTodo', value )
        // 清空
        e.target.value = ''
        // 重新获得焦点
        e.target.focus()
      }
    }
    return {
      addTodo
    }
  }
} )
</script>
