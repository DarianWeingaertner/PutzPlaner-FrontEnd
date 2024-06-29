<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { handleAuthClick, handleSignoutClick, getUserProfile, listTasks, getGoogleAuthUrl } from '@/utils/gapi';
import { getTasks, addTask, deleteTask, markTaskAsCompleted, updateTask } from '@/services/apiService';

type Task = { id: number; name: string };
type UserProfile = { id: string; name: string; email: string; imageUrl: string };

const tasks = ref<Task[]>([]);
const userProfile = ref<UserProfile | null>(null);

onMounted(async () => {
  try {
    const profile = await getUserProfile(); // falls getUserProfile asynchron ist
    if (profile) {
      userProfile.value = profile;
    }
    await fetchTasksFromApi();
  } catch (error) {
    console.error('Error during mounted hook:', error);
  }
});

const authenticate = async () => {
  try {
    const authUrl = await getGoogleAuthUrl();
    window.location.href = authUrl;
  } catch (error) {
    console.error('Authentication error:', error);
  }
};

const signOut = async () => {
  try {
    await handleSignoutClick();
    userProfile.value = null;
  } catch (error) {
    console.error('Sign out error:', error);
  }
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

const fetchTasksFromApi = async () => {
  try {
    const apiTasks = await getTasks();
    tasks.value = apiTasks.map((task: any) => ({
      id: task.id,
      name: task.name,
    }));
  } catch (error) {
    console.error('Error fetching tasks from API:', error);
  }
};
</script>

<template>
  <div class="container shadow p-4">
    <h3>Deine Google Aufgaben:</h3>
    <div class="d-flex justify-content-between mb-4">
      <button @click="authenticate" class="btn btn-primary">Einloggen in Google</button>
      <button @click="fetchGoogleTasks" class="btn btn-primary">Aufgaben anzeigen</button>
      <button @click="signOut" class="btn btn-danger">Ausloggen</button>
    </div>
    <div v-if="userProfile" class="mb-4">
      <h3>Angemeldet als:</h3>
      <div class="d-flex align-items-center">
        <img :src="userProfile.imageUrl" alt="Profile Image" class="profile-image me-3" />
        <div>
          <p>Name: {{ userProfile.name }}</p>
          <p>Email: {{ userProfile.email }}</p>
        </div>
      </div>
    </div>
    <table class="table table-striped">
      <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="!tasks.length">
        <td colspan="2" class="text-center">Keine aktuellen Aufgaben!</td>
      </tr>
      <tr v-for="task in tasks" :key="task.id">
        <td>{{ task.id }}</td>
        <td>{{ task.name }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.container {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
}

.profile-image {
  border-radius: 50%;
  width: 100px;
  height: 100px;
}

:root[data-bs-theme="dark"] h3 {
  color: #ececec;
}

h3 {
  color: #343a40;
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

.btn:hover {
  background-color: var(--hover-color);
}
</style>
