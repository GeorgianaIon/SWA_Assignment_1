<script setup lang="ts">
    import { getGame, updateGame } from '../api/gameapi'
    import Score from '../components/Score.vue'
    import Image from '../components/Image.vue'
    import { Position, move, Board } from '../models/board'
    import { model, generator } from '../models/store'
    import { onMounted, ref } from 'vue'

    const maxMoveNumber = 25;
    const selectedPosition = ref<Position | undefined>(undefined); 

    onMounted(async () => {
        if (model.game.id === -1 && parseInt(localStorage.getItem("gameId") ?? '-1')) {
            model.game = await getGame(model.token, model.game.id)
        }
        if (model.game.id === -1) {
            return;
        }
        await onMoveUpdate();
    });

    const onMoveUpdate = async () => {
        if (model.game.currentMoveNumber < maxMoveNumber) {
            await updateGame(model.token, model.game)
        } else if (model.game.id !== -1) {
            model.game.completed = true
            await updateGame(model.token, model.game)
        }
    }

    const selectTile = async (ir: number, ic: number) => {
        if (model.game.currentMoveNumber < maxMoveNumber) {
            if (selectedPosition.value === undefined) {
                selectedPosition.value = { row: ir, col: ic };
            } else {
                await setSelectTile(selectedPosition.value, ir, ic);
                selectedPosition.value = undefined;
            }
        }
    }

    const setSelectTile = async (selectedPosition: Position, ir: number, ic: number) => {
        try {
            const newBoard: Board<string> = JSON.parse(JSON.stringify(model.game.board));
            const result = move(generator, newBoard, selectedPosition, {
                row: ir,
                col: ic
            });
            if (result.effects.length > 0) {
                const score = result.effects.filter((effect) => effect.kind == "Match").length * 5;
                model.updateBoard(result.board, score);
                await onMoveUpdate();
            }
        } 
        catch (error) { 
            alert("Could not make move")
        }
    }
</script>

<template>
  <div class="board-page">
    <div>
      <Score
        :score="model.game.score"
        :max-move-number= "maxMoveNumber"
        :current-move-number= "model.game.currentMoveNumber"
      />
      <div class="board-container">
        <div class="board">
          <table>
            <tbody>
              <tr v-for= "(row, ir) in model.game.board?.pieces" :key="ir">
                <td v-for="(col, ic) in row" :key = "ic" class="tile" :class="{'selected-tile': (
                    selectedPosition !== undefined &&
                    selectedPosition.col == ic &&
                    selectedPosition.row == ir
                  )}"
                  @click = "selectTile(ir, ic)"
                >
                  <Image :src="col" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .board-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .board-container {
    display: flex;
    border-spacing: 0;
    justify-content: center;
    align-items: center;
    flex-flow: column;
  }

  .board-container table {
    border-collapse: collapse;
    border-spacing: 0;
    border-radius: 1rem;
    overflow: hidden;
  }

  .board {
    border: 1px solid black;
    margin: 1rem 0;
    border-radius: 1rem;
  }

  .tile {
    border: solid 1px black;
    width: 5rem;
    height: 5rem;
    padding: 0;
    display: inline-block
  }

  .selected-tile {
    border: solid 1px yellow !important;
  }

  img {
    width: 100%;
    height: 100%;
  }
</style>