<script lang="ts">
    import * as api from '../api/gameapi'
    import { model } from "../models/store"
    import { GameModel } from '../models/apiModels';

    export default {
        data() {
            return { 
                model
            }
        },
        mounted() {
            if (model.token !== undefined) {
                api.getAllGames(model.token).then((result: GameModel[]) => {
                    model.games = result
                })
            }
        },
        methods: {
            continueGame(gameId : number) {
                api.getGame(model.token, gameId).then((result : GameModel) => {
                    model.selectGame(result)
                    this.$router.push('/board');
                }
            )},
            newGame() {
                api.createGame(model.token).then((result : GameModel) => {
                    model.createGame(result.id)
                    this.$router.push('/board');
                })

            }
        }
    }
</script>

<template>
    <div className="board-body">
        <div className="start-container">
            <h1>Resume your games:</h1>
            <div className="row" v-for="game in model.games.filter((game) => !game.completed && game.user === model.user.id && game.board && game.score !== 0)">
              <button className="start-game" v-on:click="continueGame(game.id)">
                Game {{game.id}}
              </button>
            </div>
            </div>
        <h3>Or</h3>
      <button className="start-new" v-on:click="newGame()">
        Start a new game
      </button>
    </div>
</template>