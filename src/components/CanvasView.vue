<template>
    <div id="BoardView">
        <h2>Canvas Letter Board</h2>
        <Canvas :width="5" :height="7" :eraseTrigger="eraseTrigger" :calculateTrigger="calculateTrigger" @onCalculate="onCalculate" />
        <div id="ButtonContainer">
            <button class="green" type="button" @click="getLetter">Get Letter</button>
            <button class="red" type="button" @click="clear">Clear</button>
        </div>
        <p v-if="nearestLetter != ''">The nearest letter is '{{nearestLetter}}'.</p>
    </div>
</template>

<script lang="ts">
import getNearestLetter from '@/getNearestLetter'
import { Component, Vue } from 'vue-property-decorator'
import Canvas from './Canvas.vue'

@Component({
    components: {
        Canvas
    }
})
export default class CanvasView extends Vue {
    eraseTrigger = false
    calculateTrigger = false
    nearestLetter = ''

    getLetter () {
        this.calculateTrigger = true
        setTimeout(() => {
            this.calculateTrigger = false
        }, 500)
    }

    clear () {
        this.nearestLetter = ''
        this.eraseTrigger = true
        setTimeout(() => {
            this.eraseTrigger = false
        }, 500)
    }

    onCalculate (boardState: [Array<boolean>, Array<boolean>]) {
        this.nearestLetter = getNearestLetter(boardState)
    }
}
</script>

<style scoped>

    #BoardView {
        display: block;
        margin: 0 auto;
    }

    #ButtonContainer {
        margin-top: 15px;
        display: flex;
        justify-content: space-between;
    }

</style>
