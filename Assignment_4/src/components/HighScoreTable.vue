<script lang="ts">
import { GameModel } from '../models/apiModels'
export default{
    props: {
        games: {
            type: Array<GameModel>,
            default: []
        }
    }
}
</script>

<template>
    <table>
        <tbody
            v-for="game in games">
            <tr :style="`font-size: ${games.indexOf(game) === 0 ? 30 : 16}px`">
                <td>{{games.indexOf(game) + 1}}.</td>
                <td>{{game.score}}</td>
            </tr>
        </tbody>
    </table>
</template>
