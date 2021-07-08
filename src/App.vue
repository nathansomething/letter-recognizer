<template>
    <div id="app">
        <h1>Letter Recognizer</h1>
        <div id="main">
            <BoardView />
            <CanvasView />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BoardView from './components/BoardView.vue'
import CanvasView from './components/CanvasView.vue'

@Component({
    components: {
        BoardView,
        CanvasView
    }
})
export default class App extends Vue {}
</script>

<style>

    @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap');

    #main {
        display: flex;
        justify-content: center;
        font-family: 'Lato', sans-serif;
    }

    h1 {
        text-align: center;
    }

    button {
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        cursor: pointer;
    }

    button.green {
        background-color: #4CAF50;
    }

    button.red {
        background-color: #f44336;
    }
</style>
