<template>
    <div class="block">
    </div>
</template>

<script>
    import { mapMutations } from 'vuex';

    export default {
        data: () => ({
            cards: []
        }),
        methods: {

            ...mapMutations([
                'updateDeck',
            ]),

            shuffleCards() {
                let j, x, i;
                this.cards = this.$store.state.cards;
                for (i = this.cards.length - 1; i > 0; i--) {
                    j = Math.floor(Math.random() * (i + 1));
                    x = this.cards[i];
                    this.cards[i] = this.cards[j];
                    this.cards[j] = x;
                }
            },
        },

        beforeMount() {
            this.shuffleCards()
            this.updateDeck(this.cards)
        },

        props: {
            msg: String
        },

        name: 'Deck'
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .block {
        display: block;
    }

</style>
