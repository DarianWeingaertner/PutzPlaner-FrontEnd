<template>
  <div id="app">
    <header>
      <!-- Logo und Navigation -->
      <img alt="Vue logo" class="logo" src="@/assets/PutzPlanerLogo.svg" width="125" height="125" />
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Features</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Pricing</a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" aria-disabled="true">Disabled</a>
              </li>
            </ul>
          </div>
        </div>
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
