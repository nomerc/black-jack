import 'materialize-css'
import 'materialize-css/dist/css/materialize.css'
import {createStore} from "vuex"

const store = createStore({
    state: {
        cards: [{name: "2_of_clubs", value: 2}, {name: "3_of_clubs", value: 3},
            {name: "4_of_clubs", value: 4}, {name: "5_of_clubs", value: 5},
            {name: "6_of_clubs", value: 6}, {name: "7_of_clubs", value: 7},
            {name: "8_of_clubs", value: 8}, {name: "9_of_clubs", value: 9},
            {name: "10_of_clubs", value: 10}, {name: "jack_of_clubs", value: 10},
            {name: "queen_of_clubs", value: 10}, {name: "king_of_clubs", value: 10},
            {name: "ace_of_clubs", value: 11},
            {name: "2_of_diamonds", value: 2}, {name: "3_of_diamonds", value: 3},
            {name: "4_of_diamonds", value: 4}, {name: "5_of_diamonds", value: 5},
            {name: "6_of_diamonds", value: 6}, {name: "7_of_diamonds", value: 7},
            {name: "8_of_diamonds", value: 8}, {name: "9_of_diamonds", value: 9},
            {name: "10_of_diamonds", value: 10}, {name: "jack_of_diamonds", value: 10},
            {name: "queen_of_diamonds", value: 10}, {name: "king_of_diamonds", value: 10},
            {name: "ace_of_diamonds", value: 11},
            {name: "2_of_hearts", value: 2}, {name: "3_of_hearts", value: 3},
            {name: "4_of_hearts", value: 4}, {name: "5_of_hearts", value: 5},
            {name: "6_of_hearts", value: 6}, {name: "7_of_hearts", value: 7},
            {name: "8_of_hearts", value: 8}, {name: "9_of_hearts", value: 9},
            {name: "10_of_hearts", value: 10}, {name: "jack_of_hearts", value: 10},
            {name: "queen_of_hearts", value: 10}, {name: "king_of_hearts", value: 10},
            {name: "ace_of_hearts", value: 11},
            {name: "2_of_spades", value: 2}, {name: "3_of_spades", value: 3},
            {name: "4_of_spades", value: 4}, {name: "5_of_spades", value: 5},
            {name: "6_of_spades", value: 6}, {name: "7_of_spades", value: 7},
            {name: "8_of_spades", value: 8}, {name: "9_of_spades", value: 9},
            {name: "10_of_spades", value: 10}, {name: "jack_of_spades", value: 10},
            {name: "queen_of_spades", value: 10}, {name: "king_of_spades", value: 10},
            {name: "ace_of_spades", value: 11},
        ],
        deck: [],
        dealerCards: [],
        playerCards: [],
        playerCash: 100,
        currentBet: 0,
        isGameRunning: false,
        winner: 'Playing...'
    },

    mutations: {
        updateDeck(state, shuffledCards) {
            state.cards = shuffledCards
            state.deck = shuffledCards.slice()
        },

        placeBet(state, bet) {
            state.currentBet = bet
            state.playerCash -= state.currentBet
            console.log(bet, state.playerCash)
        },

        dealCards(state) {
            if (state.cards.length < 4) {
                state.cards = state.deck.slice()
            }

            state.playerCards = []
            state.playerCards[0] = state.cards.shift();
            state.playerCards[1] = state.cards.shift();

            state.dealerCards = []
            state.dealerCards[0] = state.cards.shift();
            state.dealerCards[1] = state.cards.shift();
        },

        dealCardToPlayer(state) {
            if (state.cards.length < 1) {
                state.cards = state.deck.slice()
            }
            state.playerCards[2] = state.cards.shift();
        },

        dealCardToDealer(state) {
            if (state.cards.length < 1) {
                state.cards = state.deck.slice()
            }
            state.dealerCards[2] = state.cards.shift();
        },

        resetGame(state) {
            state.winner = 'Playing...'
            state.isGameRunning = true
        }
    },

    getters: {
        dealerPoints: state => {
            //REDUCE USAGE FOR ARRAY OF OBJECTS
            return state.dealerCards.reduce(
                (acc, cur) => ({value: acc.value + cur.value})).value
        },

        playerPoints: state => {
            return state.playerCards.reduce(
                (acc, cur) => ({value: acc.value + cur.value})).value
        },

        getWinner: state => {
            if (store.getters.dealerPoints > 21 && store.getters.playerPoints <= 21)
                state.winner = `You won`//${state.currentBet}$
            else if (store.getters.playerPoints > 21 && store.getters.dealerPoints <= 21)
                state.winner = 'You lost'
            else if (store.getters.playerPoints >= store.getters.dealerPoints)
                state.winner = `You won`// ${state.currentBet}$
            else
                state.winner = 'You lost'

            //award winner
            if (state.winner === 'You won')
                state.playerCash = +state.playerCash + state.currentBet * 2

            state.currentBet = 0
            state.isGameRunning = false
        }
    }
})

export default store