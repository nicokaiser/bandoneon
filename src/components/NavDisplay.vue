<script setup>
import { useI18n } from 'vue-i18n';
import { useStore } from '@/stores/main';
import IconReset from '@/components/icon/IconReset.vue';
import IconDownload from '@/components/icon/IconDownload.vue';
import IconColors from '@/components/icon/IconColors.vue';
import IconPin from '@/components/icon/IconPin.vue';

defineProps({
  modified: Boolean,
});

const emit = defineEmits(['download', 'save', 'reset']);

const store = useStore();
const { t } = useI18n();
</script>

<template>
  <div class="mb-2 text-center d-print-none">
    <div class="btn-group mx-2">
      <button
        v-for="item in store.allScaleTypes"
        :key="item"
        :class="[
          'btn btn-outline-secondary my-2',
          item === store.scaleType ? 'active' : null,
        ]"
        @click="store.setScaleType(item)"
      >
        {{ t(item) }}
      </button>
    </div>

    <div class="btn-group mx-2">
      <button
        v-for="item in store.allChordTypes"
        :key="item"
        :class="[
          'btn btn-outline-secondary my-2',
          item === store.chordType ? 'active' : null,
        ]"
        @click="store.setChordType(item)"
      >
        {{ item }}
      </button>
    </div>

    <div class="btn-group mx-2">
      <button
        class="btn btn-outline-secondary my-2"
        style="width: 2em"
        @click="store.showEnharmonics = !store.showEnharmonics"
      >
        {{ store.showEnharmonics ? '♯' : '♭' }}
      </button>

      <button
        :class="[
          'btn btn-outline-secondary my-2',
          store.showColors ? 'active' : null,
        ]"
        @click="store.showColors = !store.showColors"
      >
        <IconColors />
      </button>

      <button
        class="btn btn-outline-secondary my-2"
        :title="t('save_image')"
        @click="emit('download')"
      >
        <IconDownload />
      </button>

      <button
        class="btn btn-outline-secondary my-2"
        :title="t('save_voicing')"
        :disabled="!modified || !store.chordType"
        @click="emit('save')"
      >
        <IconPin />
      </button>

      <button
        class="btn btn-outline-secondary my-2"
        :title="t('reset_voicing')"
        :disabled="!store.isUserChord"
        @click="emit('reset')"
      >
        <IconReset />
      </button>
    </div>
  </div>
</template>
