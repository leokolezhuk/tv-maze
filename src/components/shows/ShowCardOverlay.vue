<template>
  <div class="show-card-overlay">
    <div class="show-card-overlay-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ShowCardOverlay",
});
</script>

<style lang="scss" scoped>
.show-card-overlay {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: black;
  text-align: center;

  .show-card-overlay-content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
