<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container">
      <a class="navbar-brand" href="/">
        <img alt="Putzplaner logo" class="logo" src="@/assets/PutzPlanerLogo.png" width="125" height="125" />

      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">Startseite</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="historie">Historie</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="info">Info</a>
          </li>
          <button id="btnSwitch">Dark Mode Button</button>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
// Typdefinition für das mögliche Theme
type Theme = 'dark' | 'light';

// Funktion zum Umschalten des Themes
function toggleTheme(): void {
  const currentTheme = document.documentElement.getAttribute('data-bs-theme') as Theme;
  const newTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-bs-theme', newTheme);
}

// Event Listener hinzufügen, wenn das Dokument geladen wird
document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('btnSwitch');
  button?.addEventListener('click', toggleTheme);
});
</script>