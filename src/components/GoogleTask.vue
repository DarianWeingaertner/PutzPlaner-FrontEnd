<script setup lang="ts">
import { ref } from 'vue';
import { handleAuthClick, handleSignoutClick, listTasks } from '@/utils/gapi';

type Task = { id: number; name: string };

const tasks = ref<Task[]>([]);

const authenticate = () => {
  handleAuthClick();
};

const signOut = () => {
  handleSignoutClick();
};

const fetchGoogleTasks = async () => {
  try {
    const response = await listTasks();
    tasks.value = response.result.items.map((task: any) => ({
      id: task.id,
      name: task.title,
    }));
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};

</script>

<template>
  <div>
    <button @click="authenticate">Authenticate</button>
    <button @click="signOut">Sign Out</button>
    <button @click="fetchGoogleTasks">Get Tasks</button>
    <table>
      <tr>
        <th>ID</th>
        <th>Name</th>
      </tr>
      <tr v-if="!tasks.length">
        <td colspan="2">Keine aktuellen Aufgaben!</td>
      </tr>
      <tr v-for="task in tasks" :key="task.id">
        <td>{{ task.id }}</td>
        <td>{{ task.name }}</td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
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

table {
  margin: 8px -8px 0;

  th,
  td {
    padding: 8px;
  }
}
</style>
