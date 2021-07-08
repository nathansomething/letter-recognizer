<template>
    <div id="BoardView">
        <h2>Pixel Letter Board</h2>
        <Board :width="5"
               :height="7"
               :triggerClear="triggerClear"
               :triggerCalculate="triggerCalculate"
               @onCalculate="onCalculate" />
        <div id="ButtonContainer">
            <button class="green" type="button" @click="getLetter">Get Letter</button>
            <button class="red" type="button" @click="clear">Clear</button>
        </div>
        <p v-if="nearestLetter != ''">The nearest letter is '{{nearestLetter}}'.</p>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Board from './Board.vue'
import getNearestLetter from '../getNearestLetter'

@Component({
    components: {
        Board
    }
})
export default class BoardView extends Vue {
    triggerClear = false
    triggerCalculate = false
    nearestLetter = ''

    getLetter () {
        this.triggerCalculate = true
        setTimeout(() => {
            this.triggerCalculate = false
        }, 500)
    }

    clear () {
        this.nearestLetter = ''
        this.triggerClear = true
        setTimeout(() => {
            this.triggerClear = false
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

    button {
        margin-left: 10px;
    }

</style>
