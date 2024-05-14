<script lang="ts">
import {defineComponent} from 'vue'

type Task = { id: number; name: string }
type TaskListOaData = {
  tasks: Task[]
  nameField: string
  currentId: number
}

export default defineComponent({
  name: 'TaskList',
  props: ['title'],
  data(): TaskListOaData {
    return {
      nameField: '',
      currentId: 1,
      tasks: []
    }
  },
  methods: {
    initTask(): void {
      this.addTask('Fenster säubern')
      this.addTask('Müll rausbringen')
    },
    addTask(name: string): void {
      this.tasks.push({name, id: this.currentId++})
    },
    onFormSubmitted(): void {
      this.addTask(this.nameField.valueOf())
    },
    removeTask(id: number): void {
      this.tasks = this.tasks.filter((h) => h.id !== id)
    }
  },
  mounted() {
    this.initTask()
  }
})
</script>

<template>
  <div class="container">
    <h3>Deine Aufgaben sind:</h3>
    <table>
      <tr>
        <th></th>
        <th>Name</th>
        <th>ID</th>
      </tr>
      <tr v-if="!tasks.length">
        <td colspan="3">Keine aktuellen Aufgaben!</td>
      </tr>
      <tr v-for="task in tasks" :key="task.id">
        <td>
          <button @click="removeTask(task.id)" class="delete">erledigt</button>
        </td>
        <td>{{ task.name }}</td>
        <td>({{ task.id }})</td>
      </tr>
    </table>
    <h2>{{ title }}</h2>
    <form @submit="onFormSubmitted()" @submit.prevent>
      <!-- "@submit.prevent" prevents a page refresh after submitting form -->
      <input type="text" placeholder="Aufgabe eingeben" v-model="nameField"/>
      <button>speichern</button>
    </form>
    <hr/>
  </div>
</template>


<style scoped>
form {
  display: flex;
  margin: 0 -16px;

  * {
    margin: 16px;
  }

  input {
    flex-grow: 1;
  }
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

}
</style>
