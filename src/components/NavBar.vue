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
            <a class="nav-link" href="#">Historie</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="about">Info</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
</script>