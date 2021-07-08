<template>
  <div>
      <div v-for="heightIndex in height" :key="heightIndex">
          <span v-for="widthIndex in width" :key="widthIndex">
            <Pixel :id="`Pixel-${heightIndex * widthIndex}`"
                   :triggerClear="triggerClear"
                   :triggerCalculate="triggerCalculate"
                   @onCalculate="updateBoardState(heightIndex, widthIndex, $event)" />
          </span>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'
import Pixel from './Pixel.vue'

@Component({
    components: {
        Pixel
    }
})
export default class Board extends Vue {
    @Prop() private width!: number
    @Prop() private height!: number
    @Prop() private triggerClear!: boolean
    @Prop() private triggerCalculate!: boolean

    boardState: boolean[][] = this.getDefaultBoardState()

    getDefaultBoardState () {
        return new Array(this.height).fill(false).map(() => new Array(this.width).fill(false))
    }

    updateBoardState (yPos: number, xPos: number, isActive: boolean) {
        this.boardState[yPos - 1][xPos - 1] = isActive
    }

    @Watch('triggerCalculate')
    onCalculate (triggerCalculate: boolean) {
        if (triggerCalculate) {
            this.$emit('onCalculate', this.boardState)
        }
    }

    @Watch('triggerClear')
    onClear (triggerClear: boolean) {
        if (triggerClear) {
            this.boardState = this.getDefaultBoardState()
        }
    }
}
</script>

<style scoped>

</style>
