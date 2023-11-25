<script setup lang="ts">
    import * as api from '../api/gameapi'
    import { model } from "../models/store"
    import HighScoreTable from '../components/HighScoreTable.vue';
    import { onMounted } from 'vue';

    onMounted(async () => {
        if (model.token !== undefined) {
            model.games = await api.getAllGames(model.token)
        }
    })

    const top10Games = model.games.filter((game) => game.completed).sort((a, b) => b.score - a.score).slice(0, 10)
    const top3OwnGames = model.games.filter((game) => game.user == model.user.id && game.completed).sort((a, b) => b.score - a.score).slice(0, 3)
</script>

<template>
    <div class="highscores">
        <h3 class="title">High scores</h3>
        <HighScoreTable :games="top10Games"/>
        <br />
        <h3>Top 3 high scores</h3>
        <HighScoreTable :games="top3OwnGames" />
  </div>
</template>

<style scoped>
.title {
    font-size: 2rem;
}

.highscores{
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>