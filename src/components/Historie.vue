<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getTasks, deleteTask } from '@/services/apiService';

defineProps<{ title: string }>();

type Task = { id: number; bezeichnung: string; person: string; daysToClean: number; completed: boolean };

const tasks = ref<Task[]>([]);

function removeTask(id: number) {
  deleteTask(id).then(() => {
    tasks.value = tasks.value.filter(task => task.id !== id);
  });
}

function fetchTasks() {
  getTasks().then(fetchedTasks => {
    tasks.value = fetchedTasks.filter(task => task.completed);
  }).catch(error => {
    console.error('Error fetching tasks:', error);
  });
}


onMounted(() => {
  fetchTasks();
});
</script>

<template>
  <div class="container shadow p-3">
    <h3>Deine Aufgaben sind:</h3>
    <table>
      <tr>
        <th></th>
        <th>Bezeichnung</th>
        <th>Person</th>
        <th>Verbleibende Tage</th>
        <th>Erledigt</th>
      </tr>
      <tr v-if="!tasks.length">
        <td colspan="5">Keine aktuellen Aufgaben!</td>
      </tr>
      <tr v-for="task in tasks" :key="task.id">
        <td>
        </td>
        <td>{{ task.bezeichnung }}</td>
        <td>{{ task.person }}</td>
        <td>{{ task.daysToClean }}</td>
        <td>{{ task.completed ? 'Ja' : 'Nein' }}</td>
        <td>
          <button @click="removeTask(task.id)" class="delete">löschen</button>
        </td>
      </tr>
    </table>
    <hr/>
  </div>
</template>

<style scoped>
.container {
  transition: background-color 0.3s, color 0.3s;
}

:root[data-bs-theme="dark"] .container {
  background-color: #333;
  color: #fff;
}

form {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 -16px;
  gap: 16px;
}

* {
  margin: 16px;
}

input, textarea {
  flex-grow: 1;
  background-color: inherit;
  color: inherit;
  border-color: inherit;
}

table {
  margin: 8px -8px 0;

  th, td {
    padding: 8px;
    background-color: inherit;
    color: inherit;
  }
}

button {
  border-radius: 48px;
  padding: 6px;
  border: none;
  cursor: pointer;
  background-color: var(--secondary-color);
  color: white;
}

button:hover {
  background-color: var(--hover-color);
}

@media (max-width: 600px) {
  form {
    flex-direction: column;
  }

  input, button {
    flex-basis: auto;
  }
}
</style>
