<template>
    <div>
        <h5>Dealer</h5>

        <div class="row">

            <div class="col s3">
                <div class=" status">
                    <h5>{{$store.state.winner}}</h5>
                </div>
                <div class=" status">
                    <h5>Current bet: {{$store.state.currentBet}}</h5>
                </div>
            </div>

            <div class="card-holder col s6">
                <div class="inline-block card-border"
                     v-for="card in $store.state.dealerCards"
                     :key="card">
                    <img :src="require('@/assets/svg-cards/'+ card.name + '.svg')" alt="img" width="150">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Dealer',
        props: {
            msg: String
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .card-holder {
        display: block;
        height: 218px;
    }

    .inline-block {
        display: inline-block;
    }

    .card-border {
        border: black 1px solid;
        border-radius: 10px;
        margin: 5px;
    }

    .status {
        display: flex;
        height: 109px;
        justify-content: center;
        align-items: center;
        color: red;
    }
</style>
