<template>
  <svg
    ref="svgEl"
    class="keyboard mb-4"
    viewBox="0 0 900 410"
    width="900"
    height="428"
  >
    <slot />
  </svg>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const svgEl = ref();

const download = (filename: string) => {
  // https://mybyways.com/blog/convert-svg-to-png-using-your-browser

  const margin = 30;
  const canvas = document.createElement('canvas');
  canvas.width = (svgEl.value.getBoundingClientRect().width + margin) * 2;
  canvas.height = (svgEl.value.getBoundingClientRect().height + margin) * 2;
  const data = new XMLSerializer().serializeToString(svgEl.value);
  const win = window.URL || window.webkitURL || window;
  const img = new Image();
  const blob = new Blob([data], { type: 'image/svg+xml' });
  const url = win.createObjectURL(blob);

  img.addEventListener('load', () => {
    const context = canvas.getContext('2d');
    if (!context) return;

    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(
      img,
      margin,
      margin,
      canvas.width - 2 * margin,
      canvas.height - 2 * margin,
    );
    win.revokeObjectURL(url);
    const uri = canvas
      .toDataURL('image/png')
      .replace('image/png', 'octet/stream');
    const a = document.createElement('a');
    document.body.append(a);
    a.style.display = 'none';
    a.href = uri;
    a.download = filename;
    a.click();
    win.revokeObjectURL(uri);
    a.remove();
  });

  img.src = url;
};

defineExpose({ download });
</script>

<style scoped>
.keyboard {
  width: 100%;
  height: calc(100% / 720 * 428);
  max-height: calc(90vh - 5em);
  min-height: 10rem;
}
</style>
