<template>
  <v-app>
    <v-main>
      <PopoverRoot />
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PopoverRoot from "@/components/PopoverRoot.vue";

export default defineComponent({
  name: "App",

  components: { PopoverRoot },

  data() {
    return {
      //
    };
  },
});
</script>
