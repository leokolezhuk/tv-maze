<template>
  <v-row class="fill-height ma-0" align="center" justify="center">
    <v-progress-circular indeterminate color="grey lighten-5 pa-8" width="2">
      <v-icon size="75" color="grey-darken-3"> mdi-movie </v-icon>
    </v-progress-circular>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ShowImagePlaceholder",
});
</script>

<style lang="scss" scoped>
.v-icon {
  width: 150px;
  height: 150px;
}
</style>
