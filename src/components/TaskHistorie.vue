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
    tasks.value = fetchedTasks.filter((task: Task) => task.completed);
  }).catch(error => {
    console.error('Error fetching tasks:', error);
  });
}


onMounted(() => {
  fetchTasks();
});
</script>

<template>
  <div class="container shadow p-4">
    <h3 class="mb-4">Abgeschlossene Aufgaben</h3>
    <table class="table table-striped">
      <thead>
      <tr>
        <th>Bezeichnung</th>
        <th>Person</th>
        <th>Verbleibende Tage</th>
        <th>Erledigt</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="!tasks.length">
        <td colspan="5" class="text-center">Keine abgeschlossenen Aufgaben!</td>
      </tr>
      <tr v-for="task in tasks" :key="task.id">
        <td>{{ task.bezeichnung }}</td>
        <td>{{ task.person }}</td>
        <td>{{ task.daysToClean }}</td>
        <td>{{ task.completed ? 'Ja' : 'Nein' }}</td>
        <td>
          <button @click="removeTask(task.id)" class="btn btn-danger btn-sm">Löschen</button>
        </td>
      </tr>
      </tbody>
    </table>
    <hr/>
  </div>
</template>

<style scoped>
.container {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
}

h3 {
  color: #343a40;
}

:root[data-bs-theme="dark"] .container {
  background-color: #212529;
  color: #fff;
}

:root[data-bs-theme="dark"] h3 {
  color: #ececec;
}

.table {
  margin-top: 16px;
}

.table th, .table td {
  vertical-align: middle;
}

.text-center {
  text-align: center;
}

.btn {
  margin: 4px;
}
</style>
