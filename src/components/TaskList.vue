<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getTasks, addTask, deleteTask, markTaskAsCompleted } from '@/services/apiService';
import GoogleTasks from './GoogleTask.vue';

defineProps<{ title: string }>();

type Task = { id: number; bezeichnung: string; person: string; daysToClean: number; isCompleted: boolean };

const tasks = ref<Task[]>([]);
const bezeichnungField = ref('');
const personField = ref('');
const daysToCleanField = ref(0);

function onFormSubmitted() {
  addTask({ bezeichnung: bezeichnungField.value, person: personField.value, daysToClean: Number(daysToCleanField.value) }).then(newTask => {
    tasks.value.push(newTask);
    bezeichnungField.value = '';
    personField.value = '';
    daysToCleanField.value = 0;
  });
}

function removeTask(id: number) {
  deleteTask(id).then(() => {
    tasks.value = tasks.value.filter(task => task.id !== id);
  });
}

function completeTask(id: number) {
  console.log("Complete task called with id: ", id); // Debug statement
  markTaskAsCompleted(id).then(updatedTask => {
    const index = tasks.value.findIndex(task => task.id === id);
    if (index !== -1) {
      tasks.value[index].isCompleted = true;
      console.log("Task updated in frontend: ", tasks.value[index]); // Debug statement
    }
  }).catch(error => {
    console.error("Error completing task: ", error); // Debug statement
  });
}

onMounted(() => {
  getTasks().then(fetchedTasks => {
    tasks.value = fetchedTasks;
  });
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
        <td colspan="4">Keine aktuellen Aufgaben!</td>
      </tr>
      <tr v-for="task in tasks" :key="task.id">
        <td>
          <button @click="completeTask(task.id)" class="delete">erledigt</button>
        </td>
        <td>{{ task.bezeichnung }}</td>
        <td>{{ task.person }}</td>
        <td>{{ task.daysToClean }}</td>
        <td>{{ task.isCompleted ? 'Ja' : 'Nein' }}</td>

      </tr>
    </table>
    <h2>{{ title }}</h2>
    <form @submit.prevent="onFormSubmitted">
      <input type="text" class="form-control" style="width: 300px;" placeholder="Aufgabe eingeben" v-model="bezeichnungField"/>
      <input type="text" class="form-control" style="width: 300px;" placeholder="Person eingeben" v-model="personField"/>
      <input type="number" class="form-control" style="width: 100px;" placeholder="Tage eingeben" v-model="daysToCleanField"/>
      <button type="submit">speichern</button>
    </form>
    <hr/>

    <GoogleTasks />
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

