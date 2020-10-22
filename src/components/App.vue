<template>
  <div id="app">
    <v-nav />
    <div class="container mb-5">
      <div class="row">
        <div class="col-xs-12">
          <v-select-variant />
          <v-keyboard />
          <v-select-tonic />
          <v-select-scale />
        </div>
      </div>
    </div>
    <v-how-to />
    <v-footer />
  </div>
</template>

<script>
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

  @media print {
    .how-to,
    .footer,
    button { display: none; }
  }
</style>
