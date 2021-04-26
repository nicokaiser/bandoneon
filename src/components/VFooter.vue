<template>
  <footer class="d-print-none">
    <div class="container my-4">
      <div class="float-right">
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
      <p>
        <i18n path="license">
          <template #name>
            <a
              href="https://kaiser.me/"
              target="_blank"
            >Nico Kaiser</a>
          </template>
          <template #mit>
            <a
              href="https://github.com/nicokaiser/bandoneon/blob/main/LICENSE"
              target="_blank"
            >{{
              $t('mit-license')
            }}</a>
          </template>
        </i18n>
        <br>
        <i18n path="built">
          <template #tonal>
            <a
              href="https://github.com/tonaljs/tonal"
              target="_blank"
            >tonal</a>
          </template>
          <template #vuejs>
            <a
              href="https://vuejs.org/"
              target="_blank"
            >Vue.js</a>
          </template>
          <template #bootstrap>
            <a
              href="https://getbootstrap.com/"
              target="_blank"
            >Bootstrap</a>
          </template>
        </i18n>
        &ensp;
        <i18n path="available">
          <template #github>
            <a
              href="https://github.com/nicokaiser/bandoneon"
              target="_blank"
            >GitHub</a>
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
    color: #aaa;
    font-size: 80%;
  }

  footer a {
    color: #aaa;
  }

  footer img.flag {
    height: 1.25em;
  }
</style>
