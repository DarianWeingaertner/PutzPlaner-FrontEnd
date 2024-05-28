<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import { onMounted } from 'vue'
import { initClient } from '@/utils/gapi';
/*
defineComponent({
  components: {
    NavBar
  }
});
*/
onMounted(() => {
  initClient()
})
</script>

<template>
  <NavBar />
  <div id="app">
    <header></header>
    <main class="container">
      <RouterView />
    </main>
    <footer class="bg-body-tertiary">
      <p>PutzPlaner</p>
    </footer>
  </div>
</template>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  flex: 1;
}

footer.bg-body-tertiary {
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 5px 0;
}
</style>
