<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { initClient, handleAuthClick, handleSignoutClick, listTasks } from '@/utils/gapi';

defineProps<{ title: string }>()

type Task = { id: number; name: string; person: string; daysLeft: number }

const tasks: Ref<Task[]> = ref([])
const nameField = ref('')
const personField = ref('')
const daysLeftField = ref(0);
let currentId = 1

function initTasks(): void {
  addTask('Fenster säubern', 'Lennard', 3)
  addTask('Müll rausbringen', 'Darian', 6)
}

function addTask(name: string, person : string, daysLeft : number): void {
  tasks.value.push({ name, person, daysLeft, id: currentId++ })
}

function onFormSubmitted(): void {
  addTask(nameField.value, personField.value, Number(daysLeftField.value))
}

function removeTask(id: number): void {
  tasks.value = tasks.value.filter((h) => h.id !== id)
}

const authenticate = () => {
  handleAuthClick();
};

const signOut = () => {
  handleSignoutClick();
};

const getTasks = async () => {
  const response = await listTasks();
  remoteTasks.value = response.result.items;
};

onMounted(() => {
  initTasks()
  initClient();
})

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
        <td colspan="3">Keine aktuellen Aufgaben!</td>
      </tr>
      <tr v-for="task in tasks" :key="task.id">
        <td>
          <button @click="removeTask(task.id)" class="delete">erledigt</button>
        </td>
        <td>{{ task.name }}</td>
        <td>({{ task.person }})</td>
        <td>({{ task.daysLeft }})</td>

      </tr>
    </table>
    <h2>{{ title }}</h2>
    <form @submit="onFormSubmitted()" @submit.prevent>
      <!-- "@submit.prevent" prevents a page refresh after submitting form -->
      <input type="text" class="form-control" style="width: 300px;" placeholder="Aufgabe eingeben" v-model="nameField"/>
      <input type="text" class="form-control" style="width: 300px;" placeholder="Person eingeben" v-model="personField"/>
      <input type="text" class="form-control" style="width: 100px;" placeholder="" v-model="daysLeftField"/>

      <button>speichern</button>
    </form>
    <hr/>
    <div>
      <button @click="authenticate">Authenticate</button>
      <button @click="signOut">Sign Out</button>
      <button @click="getTasks">Get Tasks</button>
      <ul>
        <li v-for="task in tasks" :key="task.id">{{ task.title }}</li>
      </ul>
    </div>
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