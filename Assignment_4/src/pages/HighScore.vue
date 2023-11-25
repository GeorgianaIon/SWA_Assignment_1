<script lang="ts">
    import * as api from '../api/gameapi'
    import { model } from "../models/store"
    import HighScoreTable from '../components/HighScoreTable.vue';
    import { GameModel } from '../models/apiModels';

    export default {
        data() {
            return { 
                model,
                top10Games: [],
                top3OwnGames: [] 
            }
        },
        components: {
        HighScoreTable,
        },
        mounted() {
            if (model.token !== undefined) {
                api.getAllGames(model.token!).then((result: GameModel[]) => {
                    model.games = result
                })
            }
        }
    }
</script>

<template>
    <div class="highscores">
        <h3 className="bigger-font">High scores</h3>
        <HighScoreTable :games="model.games.filter((game) => game.completed).sort((a, b) => b.score - a.score).slice(0, 10)"/>
        <br />
        <h3>Top 3 high scores</h3>
        <HighScoreTable :games="model.games.filter((game) => game.user == model.user.id && game.completed).sort((a, b) => b.score - a.score).slice(0, 3)" />
  </div>
</template>