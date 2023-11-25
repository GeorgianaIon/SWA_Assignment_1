<script setup lang="ts">
    import * as api from '../api/gameapi'
    import { model } from "../models/store"
    import { GameModel } from '../models/apiModels';
    import { onMounted } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter()
    onMounted(async () => {
        if (model.token !== undefined) {
            api.getAllGames(model.token).then((result: GameModel[]) => {
                model.games = result
            })
        }
    })
       
    const continueGame = async (gameId : number) => {
        const result = await api.getGame(model.token, gameId)
        model.selectGame(result)
        router.push('/board');
    }
    
    const newGame = async() => {
        const result = await api.createGame(model.token)
        model.createGame(result.id)
        router.push('/board')
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
        <button v-on:click="newGame" className="start-new" >
        Start a new game
        </button>
    </div>
</template>