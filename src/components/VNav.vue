<i18n>
{
  "de": {
    "bandoneon": "Bandoneon"
  },
  "en": {
    "bandoneon": "Bandoneon"
  },
  "es": {
    "bandoneon": "Bandoneón"
  }
}
</i18n>

<template>
  <nav class="navbar navbar-light bg-light mb-5">
    <div class="container justify-content-center">
      <router-link
        :to="{ name: 'home' }"
        class="navbar-brand"
      >
        {{ $t('bandoneon') }}
      </router-link>
    </div>
  </nav>
</template>
