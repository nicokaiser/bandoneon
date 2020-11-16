<i18n>
{
  "de": {
    "einheitsbandonion144": "144 Töne, Einheitsbandonion",
    "rheinische142": "142 Töne, Rheinische Tonlage",
    "rheinische152": "152 Töne, Rheinische Tonlage, klassische Erweiterung",
    "peguri146": "146 Töne, Peguri-System (chromatisch)",
    "manouri148": "148 Töne, Manouri-System (chromatisch)"
  },
  "en": {
    "einheitsbandonion144": "144 tones, Einheitsbandonion",
    "rheinische142": "142 tones, Rheinische Tonlage",
    "rheinische152": "152 tones, Rheinische Tonlage, historic extension",
    "peguri146": "146 tones, Peguri system (chromatic)",
    "manouri148": "148 tones, Manouri system (chromatic)"
  },
  "es": {
    "einheitsbandonion144": "144 tonos, Einheitsbandonion",
    "rheinische142": "142 tonos, Rheinische Tonlage",
    "rheinische152": "152 tonos, Rheinische Tonlage, extensión histórico",
    "peguri146": "146 tonos, Peguri system (cromatico)",
    "manouri148": "148 tonos, Manouri system (cromatic)"
  }
}
</i18n>

<template>
  <div class="my-3 form-group">
    <select
      id="inputState"
      class="form-control d-print-none"
      @change="setInstrument($event)"
    >
      <option
        v-for="instrument in instruments"
        :key="instrument"
        :selected="selectedInstrument === instrument"
        :value="instrument"
      >
        {{ $t(instrument) }}
      </option>
    </select>
  </div>
</template>

<script>
  export default {
    computed: {
      instruments() {
        return Object.keys(this.$store.state.instruments)
      },

      selectedInstrument() {
        return this.$store.state.instrument
      }
    },

    methods: {
      setInstrument(event) {
        this.$store.commit('setInstrument', event.target.value);
      },
    }
  }
</script>
