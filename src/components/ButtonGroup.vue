<template>
  <div class="buttongroup">
    <slot />
  </div>
</template>

<style>
.buttongroup button:not(:last-child),
.buttongroup button:not(:last-child):hover {
  border-right: 0 none;
}

.buttongroup button:not(:first-of-type):not(:last-of-type) {
  border-radius: 0;
}

.buttongroup button:first-of-type:not(:only-of-type) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.buttongroup button:last-of-type:not(:only-of-type) {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.buttongroup button:focus {
  position: relative;
  z-index: 1;
}
</style>
