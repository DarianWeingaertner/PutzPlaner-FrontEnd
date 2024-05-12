<template>
  <div id="app">
    <header>
      <!-- Logo und Navigation -->
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </header>

    <!-- Router View für Content wie HomeView oder AboutView -->
    <main>
      <RouterView />
    </main>

    <!-- Footer, kann auch weitere Links oder Informationen enthalten -->
    <footer>
      <p>PutzPlaner</p>
    </footer>
  </div>
</template>

<style scoped>
header {
  background-color: #333;
  color: white;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  width: 125px;
  height: 125px;
}

nav a {
  color: white;
  text-decoration: none;
  margin: 0 10px;
}

nav a.router-link-exact-active {
  font-weight: bold;
}

main {
  padding: 20px;
}

footer {
  background-color: #222;
  color: white;
  text-align: center;
  padding: 10px 0;
}
</style>
