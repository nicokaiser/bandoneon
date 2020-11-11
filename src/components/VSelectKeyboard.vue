<i18n>
{
  "de": {
    "einheitsbandonion144": "144 Töne, Einheitsbandonion",
    "rheinische142": "142 Töne, Rheinische Tonlage",
    "rheinische152": "152 Töne, Rheinische Tonlage, klassische Erweiterung",
    "peguri146": "146 Töne, Peguri system (chromatisch)"
  },
  "en": {
    "einheitsbandonion144": "144 tones, Einheitsbandonion",
    "rheinische142": "142 tones, Rheinische Tonlage",
    "rheinische152": "152 tones, Rheinische Tonlage, historic extension",
    "peguri146": "146 tones, Peguri system (chromatic)"
  },
  "es": {
    "einheitsbandonion144": "144 tonos, Einheitsbandonion",
    "rheinische142": "142 tonos, Rheinische Tonlage",
    "rheinische152": "152 tonos, Rheinische Tonlage, extensión histórico",
    "peguri146": "146 tonos, Peguri system (cromatico)"
  }
}
</i18n>

<template>
  <div class="my-3 form-group">
    <select
      id="inputState"
      class="form-control d-print-none"
      @change="setKeyboard($event)"
    >
      <option
        v-for="keyboard in keyboards"
        :key="keyboard"
        :selected="selectedKeyboard === keyboard"
        :value="keyboard"
      >
        {{ $t(keyboard) }}
      </option>
    </select>
  </div>
</template>

<script>
  export default {
    computed: {
      keyboards() {
        return Object.keys(this.$store.state.keyboards)
      },

      selectedKeyboard() {
        return this.$store.state.keyboard
      }
    },

    methods: {
      setKeyboard(event) {
        this.$store.commit('setKeyboard', event.target.value);
      },
    }
  }
</script>
