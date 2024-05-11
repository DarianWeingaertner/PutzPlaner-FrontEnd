<template>
  <div>
    <ul>
      <li v-for="task in tasks" :key="task.id">{{ task.name }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const tasks = ref([
  { id: 1, name: 'Staubsaugen' },
  { id: 2, name: 'Fenster putzen' },
  { id: 3, name: 'Bad reinigen' }
]);
</script>
