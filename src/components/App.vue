<template>
  <div id="app">
    <v-nav />
    <div class="container mb-5">
      <v-select-variant />
      <v-keyboard
        :variant="currentVariant"
        :tonic="currentTonic"
        :scale-type="currentScaleType"
        :chord-type="currentChordType"
      />
      <v-select-tonic />
      <v-select-scale />
    </div>
    <v-how-to />
    <v-footer />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import VNav from './VNav.vue'
  import VHowTo from './VHowTo.vue'
  import VFooter from './VFooter.vue'
  import VSelectVariant from './VSelectVariant.vue'
  import VKeyboard from './VKeyboard.vue'
  import VSelectScale from './VSelectScale.vue'
  import VSelectTonic from './VSelectTonic.vue'

  export default {
    name:'App',
    components: {
      VNav, VHowTo, VFooter, VSelectVariant, VKeyboard, VSelectScale, VSelectTonic
    },
    computed: {
      ...mapGetters(['currentVariant', 'currentScaleType', 'currentChordType', 'currentTonic'])
    }
  }
</script>

<style lang="scss">
  $enable-transitions: false;
  @import "~bootstrap/scss/bootstrap";

  body {
    min-width: 750px;
  }

  .container {
    max-width: 750px;
  }

  .container .row {
    margin-right: 0;
    margin-left: 0;
  }
</style>
