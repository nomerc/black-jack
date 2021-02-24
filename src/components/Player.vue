<template>
    <div>

        <h5>You</h5>

        <div class="row">
            <div class="col s3">

                <div class="status">
                    <h6>Cash {{$store.state.playerCash}}$ </h6>
                </div>

                <div class="status">
                    <form @submit.prevent="startGame">
                        <div class="input-field">
                            <input placeholder="Place your bet" id="bet" type="number" v-model="bet">
                            <label class="active" for="bet">Your bet</label>
                            <button class="btn-small waves-effect waves-light"
                                    v-bind:class="{disabled: $store.state.isGameRunning
                                                || $store.state.playerCash <= 0
                                                || !checkForm()}"
                                    type="submit"
                                    name="start">
                                Start
                                <i class="material-icons right">send</i>
                            </button>
                        </div>
                    </form>
                </div>

                <div class="status">
                    <a class="waves-effect waves-light btn-small"
                       v-bind:class="{disabled: !$store.state.isGameRunning}"
                       @click="playerHit">
                        Hit
                    </a>

                    <a class="waves-effect waves-light btn-small"
                       v-bind:class="{disabled: !$store.state.isGameRunning}"
                       @click="playerStand">
                        Stand
                    </a>
                </div>

            </div>

            <div class="card-holder col s6">
                <div class="inline-block card-border"
                     v-for="card in $store.state.playerCards"
                     :key="card">
                    <img :src="require('@/assets/svg-cards/'+ card.name + '.svg')" alt="img" width="150">
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import {mapMutations, mapGetters} from 'vuex'

    export default {

        props: {
            msg: String
        },

        data: () => ({
            minBet: 10,
            bet: 0
        }),

        computed: {
            ...mapGetters([
                'dealerPoints',
                'playerPoints',
                'getWinner'
            ]),
        },
        methods: {
            ...mapMutations([
                'dealCards',
                'dealCardToPlayer',
                'dealCardToDealer',
                'resetGame',
                'placeBet',
                'setWinner'
            ]),

            checkForm() {
                if (this.bet <= this.$store.state.playerCash &&
                    this.bet > 0)
                    return true;
            },

            startGame() {
                this.placeBet(this.bet)
                this.resetGame()
                this.dealCards()
            },

            playerHit() {
                this.dealCardToPlayer()

                if (this.dealerPoints < 16) {
                    this.dealCardToDealer()
                }

                this.getWinner
            },

            playerStand() {

                if (this.dealerPoints < 16) {
                    this.dealCardToDealer()
                }

                this.getWinner
            },
        },

        name: 'Player'
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

    .status > h6 {
        color: grey;
        font-style: italic;
    }
</style>
