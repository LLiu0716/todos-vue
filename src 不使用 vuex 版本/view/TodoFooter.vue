<template>
  <!-- 底部 -->
  <footer class="footer" v-show="show">
    <!-- 剩余完成数 -->
    <span class="todo-count">
      <strong>{{ item }}</strong> item left
    </span>
    <!-- 过滤是否完成任务 -->
    <ul class="filters">
      <li v-for="v in foot" :key="v.name">
        <router-link :to="v.path">{{ v.name }}</router-link>
      </li>
    </ul>
    <!-- 清除已完成 -->
    <button class="clear-completed" v-show="clearItem" @click="clear">
      Clear completed
    </button>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent( {
  props: { item: Number, show: Number, clearItem: Number },
  setup: ( props, context ) => {
    const foot = [
      { name: 'All', path: '/all' },
      { name: 'Active', path: '/active' },
      { name: 'Completed', path: '/completed' }
    ]

    const clear = () => {
      context.emit( 'delTodo' )
    }

    return {
      clear,
      foot
    }
  }
} )
</script>
