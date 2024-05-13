<script>
import NavBar from './components/NavBar.vue';

export default {
  components: {
    NavBar
  }
}
</script>

<template>
  <div id="app">
    <header>
      <NavBar />
    </header>

    <main>
      <RouterView />
    </main>

    <footer>
      <p>PutzPlaner</p>
    </footer>
  </div>
</template>


