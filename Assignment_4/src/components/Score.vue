<script setup lang="ts">

defineProps<{
    score: number;
    maxMoveNumber: number;
    currentMoveNumber: number;
}>();

</script>

<template>
    <div className="text-container">
      <h1 className="board-text">Score: {{score}}</h1>
      <p className="board-text">
        Moves left: {{maxMoveNumber - currentMoveNumber}}
      </p>
    </div>
</template>

<style scoped>

.text-container {
  margin: 1rem 0;
}

</style>