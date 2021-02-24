<template>
        <div>
            <Dealer msg="Please, place your bet"/>
        </div>
        <div>
            <Player/>
        </div>
        <div>
            <Deck/>
        </div>
</template>

<script>
    import Player from './components/Player'
    import Deck from './components/Deck'
    import Dealer from './components/Dealer'

    export default {
        name: 'App',
        components: {
            Player,
            Dealer,
            Deck
        }
    }
</script>

<style>
    #app {

        background-image: url('assets/q02th.jpg');
        background-size: cover;
        overflow: hidden;
        padding-bottom: 48%;
        /*img height / img width = 1200 / 1600*/
        height: 0;

        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: white;
    }
</style>
