<script setup>
import { useStore } from '@/stores/main';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  readonly: Boolean,
});

const store = useStore();
const { t } = useI18n();

const setSide = (value) => {
  if (!props.readonly) store.side = value;
};
const toggleSide = () => {
  setSide(store.side === 'right' ? 'left' : 'right');
};

const setDirection = (value) => {
  if (!props.readonly) store.direction = value;
};
const toggleDirection = () => {
  setDirection(store.direction === 'open' ? 'close' : 'open');
};
</script>

<template>
  <div class="d-print-none container mb-4">
    <div class="row">
      <div class="col-12 col-sm-6 text-center text-nowrap mb-2">
        <span
          :class="[
            'label text-end pe-2',
            store.side === 'left' ? 'fw-bold' : 'text-muted',
          ]"
          @click.prevent="toggleSide"
        >
          {{ t('left') }}
        </span>

        <div class="form-check-inline form-switch mx-0">
          <input
            :checked="store.side === 'right'"
            class="form-check-input"
            type="checkbox"
            :disabled="readonly"
            @change="setSide($event.target.checked ? 'right' : 'left')"
          />
        </div>

        <span
          :class="[
            'label text-start ps-2',
            store.side === 'right' ? 'fw-bold' : 'text-muted',
          ]"
          @click.prevent="toggleSide"
        >
          {{ t('right') }}
        </span>
      </div>

      <div class="col-12 col-sm-6 text-center text-nowrap mb-2">
        <span
          :class="[
            'label text-end pe-2',
            store.direction === 'close' ? 'fw-bold' : 'text-muted',
          ]"
          @click.prevent="toggleDirection"
        >
          {{ t('close') }}
        </span>

        <div class="form-check-inline form-switch mx-0">
          <input
            :checked="store.direction === 'open'"
            class="form-check-input"
            type="checkbox"
            :disabled="readonly"
            @change="setDirection($event.target.checked ? 'open' : 'close')"
          />
        </div>

        <span
          :class="[
            'label text-start ps-2',
            store.direction === 'open' ? 'fw-bold' : 'text-muted',
          ]"
          @click.prevent="toggleDirection"
        >
          {{ t('open') }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$primary: #6c757d;

.label {
  width: 6em;
  display: inline-block;
  line-height: 2em;
  cursor: default;
  vertical-align: top;
  user-select: none;
}

.form-switch {
  display: inline-block;

  .form-check-input {
    width: 4em;
    height: 2em;
    margin-top: 0;

    &,
    &:checked,
    &:focus {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%236c757d'/%3e%3c/svg%3e");
    }

    &:focus {
      box-shadow: 0 0 0 0.25rem rgb(108 117 125 / 50%);
    }

    &:active {
      filter: none;
    }

    background-position: left center;
    border-color: $primary;
  }

  .form-check-input:checked {
    border-color: $primary;
    background-color: transparent;
  }
}
</style>
