<i18n>
{
  "de": {
      "left-open": "Links Zug",
      "left-close": "Links Druck",
      "right-open": "Rechts Zug",
      "right-close": "Rechts Druck"
  },
  "en": {
    "left-open": "Left open",
    "left-close": "Left close",
    "right-open": "Right open",
    "right-close": "Right close"
  },
  "es": {
    "left-open": "Izquierda abriendo",
    "left-close": "Izquierda cerrando",
    "right-open": "Derecha abriendo",
    "right-close": "Derecha cerrando"
  }
}

</i18n>

<template>
  <ul class="nav nav-tabs nav-fill">
    <li
      v-for="variant in variants"
      :key="variant"
      class="nav-item"
    >
      <a
        :class="['nav-link', (currentVariant === variant) ? 'active' : null]"
        href="#"
        @click.prevent="setVariant(variant)"
      >
        {{ $t(variant) }}
      </a>
    </li>
  </ul>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      variants() {
        return this.$store.state.variants
      },

      ...mapGetters(['currentVariant'])
    },

    mounted() {
      document.addEventListener('keypress', ({ key }) => {
        if (key === 'l') return this.setVariant('left-open')
        if (key === 'L') return this.setVariant('left-close')
        if (key === 'r') return this.setVariant('right-open')
        if (key === 'R') return this.setVariant('right-close')
      })
    },

    methods: {
      setVariant(variant) {
        if (this.currentVariant === variant) return
        this.$router.push({
          name: this.$route.name,
          params: { ...this.$route.params, ...{ variant } }
        })
      }
    }
  }
</script>
