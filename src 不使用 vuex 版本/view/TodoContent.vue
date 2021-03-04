<template>
  <!-- 主体 -->
  <section class="main">
    <input
      id="toggle-all"
      class="toggle-all"
      type="checkbox"
      @change="allCheckbox"
      :checked="!checked"
    />
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list">
      <!-- These are here just to show the structure of the list items -->
      <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
      <!-- :class="[v.done ? 'completed' : '', v.id == ider ? 'editing' : '']" -->
      <!-- :class="{ completed: v.done, editing: v.id == ider }" -->
      <li
        :class="{ completed: v.done, editing: v.id == ider }"
        v-for="v in list"
        :key="v.id"
      >
        <div class="view">
          <input
            class="toggle"
            type="checkbox"
            :checked="v.done"
            @change="checked(v.id)"
          />
          <label @dblclick="dblclick(v.id, v.name)">{{ v.name }}</label>
          <button class="destroy" @click="delTodo(v.id)"></button>
        </div>
        <input
          class="edit"
          type="text"
          v-focus
          :value="value"
          @blur="blur(v.id, $event)"
          @keyup.enter="(e) => e.target.blur()"
        />
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

/** 还是 vue 的基本原则 , 子组件不能修改父组件的数据 */
export default defineComponent( {
  // directives: {
  //   focus: {
  //     beforeMount ( el, binding, vnode ) {
  //       console.log( 'beforeMount , 观察它的执行时机' )
  //     },
  //     mounted ( el ) {
  //       console.log( 'mounted , 观察它的执行时机' )
  //     },
  //     beforeUpdate ( el ) {
  //       console.log( 'beforeUpdate , 观察它的执行时机' )
  //     },
  //     updated ( el ) {
  //       el.focus()
  //       console.log( 'updated , 观察它的执行时机' )
  //     },
  //     beforeUnmount ( el ) {
  //       console.log( 'beforeUnmount , 观察它的执行时机' )
  //     },
  //     unmounted ( el ) {
  //       console.log( 'unmounted , 观察它的执行时机' )
  //     }
  //   }
  // },
  props: { list: Array, checked: Boolean },
  setup ( props, context ) {
    const data = reactive( {
      ider: -1,
      value: ''
    } )

    const delTodo = ( id: number ) => {
      context.emit( 'delTodo', id )
    }

    const checked = ( id: number ) => {
      context.emit( 'upCheckedTodo', id )
    }

    const dblclick = ( id: number, name: string ) => {
      data.ider = id
      data.value = name
    }

    const blur = ( id: number, e: any ) => {
      const value: string = e.target.value.trim()
      if ( value !== data.value ) {
        context.emit( 'upNameTodo', id, value )
      }
      data.ider = -1
      data.value = ''
    }

    const allCheckbox = ( e: any ) => {
      const allCheck: boolean = e.target.checked
      context.emit( 'upCheckedTodo', 0, allCheck )
    }

    return {
      // toRefs 将数据包装为双向绑定
      ...toRefs( data ),
      delTodo,
      allCheckbox,
      checked,
      dblclick,
      blur
    }
  }
} )
</script>
