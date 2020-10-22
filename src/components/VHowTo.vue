<i18n>
{
  "de": {
    "howToUse": "Benutzung",
    "summary": "Diese Website möchte helfen, die Tastenbelegung des Bandoneons zu erlernen.",
    "usage1": "Die Tabs über der Tastatur wechseln die Balgrichtung (Zug/Druck oder öffnen/schließen) und die Seite (links oder rechts).",
    "usage2": "Tonart und Modus auswählen, um eine Tonleiter anzuzeigen – z.B. {cMajor}",
    "cMajor": "C-Dur",
    "usage3": "Tonart und Bezeichnung auswählen, um einen Akkord anzuzeigen – z.B. {em7}",
    "em7": "E m7",
    "shortcuts": "Tastaturkurzbefehle: {shortcutsVariant} wählt die Seite und Richtung; {shortcutsChordType} wählt Dur, Moll und Septakkord; {shortcutsTonic} wählt die Tonart; {shortcutSharp} hinzufügen um die jeweilige Kreuz-Tonart zu wäheln; {shortcutColors} aktiviert oder deaktiviert die Farbdarstellung.",
    "keyboardLayout": "Die Tastenbelegung basiert auf dem Alfred Arnold-Bandoneon mit 142 Tasten (wechseltönig, „Rheinische Tonlage“)."
  },
  "en": {
    "howToUse": "How to use",
    "summary": "This website wants to help to learn the Bandoneon keyboard.",
    "usage1": "The tabs above the keyboard switch the direction of the bellows (open/pull or close/push) and the side (left or right).",
    "usage2": "Select a key and a mode to display a scale — e.g. {cMajor}",
    "cMajor": "C Major",
    "usage3": "Select a key and a quality to display a chord — e.g. {em7}",
    "em7": "E m7",
    "shortcuts": "Keyboard shortcuts: {shortcutsVariant} select the side and direction; {shortcutsChordType} select Major, Minor and Septime chord; {shortcutsTonic} select the key; add {shortcutSharp} to select sharp key; {shortcutColors} toggles button colors.",
    "keyboardLayout": "The keyboard layout is based on the Alfred Arnold 142 button Bandoneon (bisonoric, “Rheinische Tonlage”)."
  },
  "es": {
    "howToUse": "Modo de utilización",
    "summary": "Este sitio web quiere ayudar a aprender el teclado bandoneón.",
    "usage1": "Las pestañas sobre el teclado cambian la dirección del fuelle (abrir o cerrar) y la mano (izquierda o derecha).",
    "usage2": "Selecciona una tónica y un modo para mostrar la escala correspondiente – por ejemplo, {cMajor}",
    "cMajor": "C mayor",
    "usage3": "Selecciona un acorde y su especie – por ejemplo, {em7}",
    "em7": "E m7",
    "shortcuts": "Atajos de teclado: {shortcutsVariant} seleccionan la mano y la dirección; {shortcutsChordType} seleccionan el acorde mayor, menor o séptimo; {shortcutsTonic} selecciona la tonalidad; añade {shortcutSharp} para seleccionar la alteración; {shortcutColors} cambia los colores del teclado.",
    "keyboardLayout": "La disposición del teclado se basa en el Bandoneón de botones Alfred Arnold 142 (bisonórico, «Rheinische Tonlage»)."
  }
}
</i18n>

<template>
  <div class="bg-light">
    <div class="container pt-5 pb-5">
      <h2 class="mb-4">
        {{ $t('howToUse') }}
      </h2>
      <p>
        {{ $t('summary') }}
      </p>
      <ul>
        <li>
          {{ $t('usage1') }}
        </li>
        <li>
          <i18n path="usage2">
            <template #cMajor>
              <router-link :to="{ name: 'scale', params: { variant: 'right-open', tonic: 'C', scaleType: 'major' } }">
                {{ $t('cMajor') }}
              </router-link>
            </template>
          </i18n>
        </li>
        <li>
          <i18n path="usage3">
            <template #em7>
              <router-link :to="{ name: 'chord', params: { variant: 'left-open', tonic: 'E', chordType: 'm7' } }">
                {{ $t('em7') }}
              </router-link>
            </template>
          </i18n>
        </li>
        <li>
          <i18n path="shortcuts">
            <template #shortcutsVariant>
              <code>l</code>, <code>L</code>, <code>r</code>, <code>R</code>
            </template>
            <template #shortcutsChordType>
              <code>M</code>, <code>m</code>, <code>7</code>
            </template>
            <template #shortcutsTonic>
              <code>c</code>, <code>d</code>, <code>e</code>, <code>f</code>, <code>g</code>, <code>a</code>, <code>b</code>
            </template>
            <template #shortcutSharp>
              <code>#</code>
            </template>
            <template #shortcutColors>
              <code>C</code>
            </template>
          </i18n>
        </li>
      </ul>
      <p>
        {{ $t('keyboardLayout') }}
      </p>
    </div>
  </div>
</template>

<style scoped>
  .container {
    max-width: 600px;
  }

  h2 {
    text-align: center;
    font-weight: 300;
  }

  li {
    margin-top: 15px;
    margin-bottom: 15px;
  }
</style>
