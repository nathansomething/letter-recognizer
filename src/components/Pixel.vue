<template>
  <button type="button" @click="toggleActive" :class="{isActive: isActive}" />
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class Pixel extends Vue {
  @Prop() triggerClear!: boolean

  isActive = false

  @Emit('onCalculate')
  toggleActive () {
    this.isActive = !this.isActive
    return this.isActive
  }

  @Watch('triggerClear')
  clear (triggerClear: boolean) {
    if (triggerClear) {
      this.isActive = false
    }
  }
}
</script>

<style scoped>

    button {
        padding: 0;
        font: inherit;
        color: inherit;
        background-color: transparent;
        /* show a hand cursor on hover; some argue that we
        should keep the default arrow cursor for buttons */
        cursor: pointer;
        width: 15px;
        height: 15px;
        background-color: #DDD;
        border-radius: 0;
        border: 1px solid #999;
        margin: 2px;
    }

    button:focus, button:active {
        border-radius: 0;
        border: 1px solid #999;
        outline: 0;
    }

    button.isActive {
        background-color: #333;
        border-radius: 0;
    }

</style>
