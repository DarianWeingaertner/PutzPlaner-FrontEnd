<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getTasks, addTask, deleteTask } from '@/services/apiService';
import GoogleTasks from './GoogleTask.vue';

defineProps<{ title: string }>();

type Task = { id: number; name: string; person: string; daysLeft: number };

const tasks = ref<Task[]>([]);
const nameField = ref('');
const personField = ref('');
const daysLeftField = ref(0);

function onFormSubmitted() {
  addTask({ name: nameField.value, person: personField.value, daysLeft: Number(daysLeftField.value) }).then(newTask => {
    tasks.value.push(newTask);
    nameField.value = '';
    personField.value = '';
    daysLeftField.value = 0;
  });
}

function removeTask(id: number) {
  deleteTask(id).then(() => {
    tasks.value = tasks.value.filter(task => task.id !== id);
  });
}

onMounted(() => {
  getTasks().then(fetchedTasks => {
    tasks.value = fetchedTasks;
  });
});

</script>

<template>
  <div class="container shadow p-3 mb-5 bg-white rounded">
    <h3>Deine Aufgaben sind:</h3>
    <table>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Person</th>
        <th>verbleibende Tage</th>
      </tr>
      <tr v-if="!tasks.length">
        <td colspan="4">Keine aktuellen Aufgaben!</td>
      </tr>
      <tr v-for="task in tasks" :key="task.id">
        <td>
          <button @click="removeTask(task.id)" class="delete">erledigt</button>
        </td>
        <td>{{ task.name }}</td>
        <td>{{ task.person }}</td>
        <td>{{ task.daysLeft }}</td>
      </tr>
    </table>
    <h2>{{ title }}</h2>
    <form @submit.prevent="onFormSubmitted">
      <input type="text" class="form-control" style="width: 300px;" placeholder="Aufgabe eingeben" v-model="nameField"/>
      <input type="text" class="form-control" style="width: 300px;" placeholder="Person eingeben" v-model="personField"/>
      <input type="number" class="form-control" style="width: 100px;" placeholder="Tage eingeben" v-model="daysLeftField"/>
      <button type="submit">speichern</button>
    </form>
    <hr/>

    <GoogleTasks />
  </div>
</template>

<style scoped>
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

input {
  flex-grow: 1;
}

table {
  margin: 8px -8px 0;

  th,
  td {
    padding: 8px;
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
    flex-direction: column; /* Stapelt die Felder vertikal bei schmalen Bildschirmen */
  }

  input, button {
    flex-basis: auto; /* Erlaubt den Elementen, die gesamte verfügbare Breite zu nutzen */
  }
}
</style>
