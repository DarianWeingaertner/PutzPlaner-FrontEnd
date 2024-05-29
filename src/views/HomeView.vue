<template>
  <div>
    <h1>Willkommen zum PutzPlaner!</h1>
    <task-list title=""></task-list>
  </div>
</template>

<script setup lang="ts">
import TaskOptionsApiList from '../components/TaskList.vue';
import TaskList from "@/components/TaskList.vue";
import {onMounted} from "vue";
import {getTasks} from "@/services/apiService";

onMounted( () => {
  getTasks()
    }
)
</script>
