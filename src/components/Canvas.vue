<template>
    <canvas id="canvas"
            ref="canvas"
            :width="canvasWidth"
            :height="canvasHeight"
            @mousemove="onMove"
            @mousedown="onDown"
            @mouseup="onOff"
            @mouseout="onOff"/>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue, Watch } from 'vue-property-decorator'

@Component
export default class Canvas extends Vue {
    @Prop() private width!: number
    @Prop() private height!: number
    @Prop() private eraseTrigger!: boolean
    @Prop() private calculateTrigger!: boolean
    @Ref() readonly canvas!: HTMLCanvasElement
    ctx: CanvasRenderingContext2D | null = null
    flag = false
    dotFlag = false
    prevX = 0
    currX = 0
    prevY = 0
    currY = 0
    canvasWidth = this.width * 50
    canvasHeight = this.height * 50

    boardState: boolean[][] = this.getDefaultBoardState()

    getDefaultBoardState () {
        return new Array(this.height).fill(false).map(() => new Array(this.width).fill(false))
    }

    draw () {
        if (this.ctx) {
            this.ctx.beginPath()
            this.ctx.moveTo(this.prevX, this.prevY)
            this.ctx.lineTo(this.currX, this.currY)
            this.ctx.strokeStyle = 'black'
            this.ctx.lineWidth = 2
            this.ctx.stroke()
            this.ctx.closePath()
        }
    }

    erase () {
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
            this.boardState = this.getDefaultBoardState()
        }
    }

    onDown (event: { clientX: number; clientY: number }) {
        this.prevX = this.currX
        this.prevY = this.currY
        this.currX = event.clientX - this.canvas.offsetLeft
        this.currY = event.clientY - this.canvas.offsetTop
        this.flag = true
        this.dotFlag = true
        if (this.dotFlag && this.ctx) {
            this.ctx.beginPath()
            this.ctx.fillStyle = 'black'
            this.ctx.fillRect(this.currX, this.currY, 2, 2)
            this.ctx.closePath()
            this.dotFlag = false
        }
    }

    onMove (event: { clientX: number; clientY: number }) {
        if (this.flag) {
            this.prevX = this.currX
            this.prevY = this.currY
            this.currX = event.clientX - this.canvas.offsetLeft
            this.currY = event.clientY - this.canvas.offsetTop
            this.draw()
        }
    }

    onOff () {
        this.flag = false
    }

    getBoardState () {
        console.log(this.boardState)
        if (this.ctx && this.boardState) {
            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    const pixelData = this.ctx.getImageData(x * 50, y * 50, (x + 1) * 50, (y + 1) * 50)
                    this.boardState[y][x] = pixelData.data.some(val => val !== 0)
                }
            }
        }
        return this.boardState
    }

    @Watch('eraseTrigger')
    triggerErase (trigger: boolean) {
        if (trigger) this.erase()
    }

    @Watch('calculateTrigger')
    triggerCalculate (trigger: boolean) {
        if (trigger) {
            this.$emit('onCalculate', this.getBoardState())
        }
    }

    mounted () {
        this.ctx = this.canvas.getContext('2d')
    }
}
</script>

<style scoped>

    canvas {
        border:2px solid;
    }

</style>
