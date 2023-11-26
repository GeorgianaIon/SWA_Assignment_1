<script setup lang="ts">
    import { getGame, updateGame } from '../api/gameapi'
    import Score from '../components/Score.vue'
    import { Position, move, Board } from '../models/board'
    import { model, generator } from '../models/store'
    import { onMounted, reactive } from 'vue'

    const maxMoveNumber = 25;
    let selectedPosition = reactive<Position>({}); 

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
            // update game
            await updateGame(model.token, model.game)
        }
    }

    const selectTile = async (ir: number, ic: number) => {
        if (model.game.currentMoveNumber < maxMoveNumber) {
            if (selectedPosition === undefined) {
                selectedPosition = ({ row: ir, col: ic });
            } else {
                await setSelectTile(selectedPosition, ir, ic);
                selectedPosition = {};
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
                await onMoveUpdate();
                model.updateBoard(result.board, score);
            }
        } 
        catch (error) 
        { alert("Could not make move");}
    }

</script>

<template>
    <div>
      <Score
        :score="model.game.score"
        :max-move-number= "maxMoveNumber"
        :current-move-number= "model.game.currentMoveNumber"
      />
      <div className="board-container">
        <div className="board">
          <table>
            <tbody>
              <tr v-for= "(row, ir) in model.game.board?.pieces" :key="ir">
                <td
                  v-for="(col, ic) in row" :key = "ic" :class="`tile ${{
                            selectedPosition &&
                            selectedPosition.col == ic &&
                            selectedPosition.row == ir
                              ? 'selected-tile'
                              : ''
                          }}`" @onClick = "() => selectTile(ir, ic)">
                        <Image :src="col" />
                  </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</template>