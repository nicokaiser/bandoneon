<template>
  <footer class="d-print-none">
    <div class="container mt-4 mb-3">
      <a
        href="#"
        class="px-1"
        @click.prevent="setLanguage('de')"
      >
        <img
          src="@/assets/images/de.svg"
          class="flag"
        >
      </a>
      <a
        href="#"
        class="px-1"
        @click.prevent="setLanguage('en')"
      >
        <img
          src="@/assets/images/en.svg"
          class="flag"
        >
      </a>
      <a
        href="#"
        class="px-1"
        @click.prevent="setLanguage('es')"
      >
        <img
          src="@/assets/images/es.svg"
          class="flag"
        >
      </a>
    </div>
    <div class="container mt-2 mb-4">
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

<script>
  export default {
    methods: {
      setLanguage(language) {
        this.$store.commit('setLanguage', language)
        this.$root.$i18n.locale = language
      }
    }
  }
</script>

<style scoped>
  footer {
    color: #777;
    text-align: center;
    font-size: 80%;
  }

  footer img.flag {
    height: 1.25em;
  }
</style>
