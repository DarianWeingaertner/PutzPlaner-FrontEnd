<template>
  <div>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <input type="checkbox" @change="toggleTask(task)" :checked="task.completed">
        <span v-if="!task.completed">{{ task.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const tasks = ref([
  { id: 1, name: 'Staubsaugen', completed: false },
  { id: 2, name: 'Fenster putzen', completed: false },
  { id: 3, name: 'Bad reinigen', completed: false }
]);
function toggleTask(task) {
  task.completed = !task.completed;
}
</script>
