<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { Modal } from 'bootstrap';

const modal = ref();
let bsModal: Modal;

onMounted(() => {
  bsModal = new Modal(modal.value, {
    backdrop: 'static',
    keyboard: false,
  });
});

onUnmounted(() => bsModal.dispose());

const show = () => bsModal.show();
const hide = () => bsModal.hide();

defineExpose({ show, hide });
</script>

<template>
  <div ref="modal" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
