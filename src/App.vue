<script>
import NavBar from './components/NavBar.vue';

export default {
  components: {
    NavBar
  }
}
</script>

<template>
  <NavBar />
  <div id="app" class="container">
    <header>

    </header>

    <main>
      <RouterView />
    </main>

    <footer>
      <p>PutzPlaner</p>
    </footer>
  </div>
</template>


