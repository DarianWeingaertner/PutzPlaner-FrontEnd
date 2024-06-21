<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getTasks, addTask, deleteTask, markTaskAsCompleted } from '@/services/apiService';
import GoogleTasks from './GoogleTask.vue';
import songUrl from '@/assets/Putzplaner.mp3';

defineProps<{ title: string }>();

type Task = { id: number; bezeichnung: string; person: string; daysToClean: number; completed: boolean };

const tasks = ref<Task[]>([]);
const bezeichnungField = ref('');
const personField = ref('');
const daysToCleanField = ref(0);
const filterPerson = ref('');

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  markTaskAsCompleted(id).then(updatedTask => {
    const index = tasks.value.findIndex(task => task.id === id);
    if (index !== -1) {
      tasks.value[index].completed = true;
    }
  }).catch(error => {
    console.error('Error completing task:', error);
  });
}

function fetchTasks() {
  getTasks().then(fetchedTasks => {
    tasks.value = fetchedTasks.filter((task: Task) => !task.completed);
  }).catch(error => {
    console.error('Error fetching tasks:', error);
  });
}

onMounted(() => {
  fetchTasks();
});

const filteredTasks = computed(() => {
  if (!filterPerson.value) {
    return tasks.value;
  }
  return tasks.value.filter(task => task.person.toLowerCase().includes(filterPerson.value.toLowerCase()));
});
</script>

<template>
  <div class="container shadow p-4">
    <h3 class="mb-4">Deine Aufgaben sind:</h3>
    <div class="filter-section mb-4">
      <input type="text" class="form-control filter-input" placeholder="Filter nach Person" v-model="filterPerson"/>
    </div>
    <table class="table table-striped">
      <thead>
      <tr>
        <th></th>
        <th>Bezeichnung</th>
        <th>Person</th>
        <th>Verbleibende Tage</th>
        <th>Erledigt</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="!filteredTasks.length">
        <td colspan="6" class="text-center">Keine aktuellen Aufgaben!</td>
      </tr>
      <tr v-for="task in filteredTasks" :key="task.id">
        <td>
          <button @click="completeTask(task.id)" class="btn btn-success btn-sm">Erledigt</button>
        </td>
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
    <h2 class="mt-4">{{ title }}</h2>
    <form @submit.prevent="onFormSubmitted" class="task-form">
      <div class="form-row">
        <div class="form-group col">
          <input type="text" class="form-control mb-2" placeholder="Aufgabe eingeben" v-model="bezeichnungField"/>
        </div>
        <div class="form-group col">
          <input type="text" class="form-control mb-2" placeholder="Person eingeben" v-model="personField"/>
        </div>
        <div class="form-group col">
          <input type="number" class="form-control mb-2" placeholder="Tage eingeben" v-model="daysToCleanField"/>
        </div>
        <div class="form-group col">
          <button type="submit" class="btn btn-primary">Aufgabe hinzugügen</button>
        </div>
      </div>
    </form>
    <hr/>
    <GoogleTasks />
    <hr/>
    <h6>Offizielle Putzplaner-Hymne: Jetzt anhören und herunterladen!</h6>
    <audio controls class="w-100">
      <source :src="songUrl" type="audio/mp3">
    </audio>
  </div>
</template>

<style scoped>
.container {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
}

:root[data-bs-theme="dark"] .container {
  background-color: #212529;
  color: #fff;
}

:root[data-bs-theme="dark"] h3, h2 {
  color: #fff;
}

h3, h2 {
  color: #343a40;
}

.filter-section {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.filter-input {
  max-width: 300px;
  margin-right: 16px;
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

.task-form {
  display: flex;
  flex-direction: column;
}

.task-form .form-row {
  display: flex;
  flex-wrap: wrap;
}

.task-form .form-group {
  flex: 1;
  margin-right: 16px;
}

.task-form .form-group:last-child {
  margin-right: 0;
}

.btn {
  margin: 4px;
}

@media (max-width: 600px) {
  .filter-section, .task-form {
    flex-direction: column;
  }

  .filter-input, .task-form .form-group {
    width: 100%;
    margin-right: 0;
  }
}
</style>
