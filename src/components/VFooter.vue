<i18n>
{
  "de": {
    "license": "Copyright © {name}, MIT-Lizenz.",
    "built": "Gebaut mit {tonal}, {vuejs} und {bootstrap}.",
    "available": "Verfügbar auf {github}."
  },
  "en": {
    "license": "Copyright © {name}, MIT License.",
    "built": "Built with {tonal}, {vuejs}, and {bootstrap}.",
    "available": "Available on {github}."
  },
  "es": {
    "license": "Copyright © {name}, licencia MIT.",
    "built": "Creado con {tonal}, {vuejs} y {bootstrap}.",
    "available": "Disponible en {github}."
  }
}
</i18n>

<template>
  <footer>
    <div class="container mt-5 mb-4">
      <p>
        <i18n path="license">
          <template #name>
            <a href="https://kaiser.me/">Nico Kaiser</a>
          </template>
        </i18n>
        <br>
        <i18n path="built">
          <template #tonal>
            <a href="https://github.com/tonaljs/tonal">tonal</a>
          </template>
          <template #vuejs>
            <a href="https://vuejs.org/">Vue.js</a>
          </template>
          <template #bootstrap>
            <a href="https://getbootstrap.com/">Bootstrap</a>
          </template>
        </i18n>
        &ensp;
        <i18n path="available">
          <template #github>
            <a href="https://github.com/nicokaiser/bandoneon">GitHub</a>
          </template>
        </i18n>
      </p>
    </div>
  </footer>
</template>

<style scoped>
  footer {
    color: #777;
    text-align: center;
    font-size: 80%;
  }
</style>
