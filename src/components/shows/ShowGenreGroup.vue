<template>
  <div>
    <div class="ml-0 mt-6 mb-2 text-left">
      <span class="text-h2 text-grey darken-1">{{ genre }}</span>
    </div>
    <ShowList :shows="shows" />
  </div>
</template>

<script lang="ts">
import Show from "@/models/Show";
import ShowList from "@/components/shows/ShowList.vue";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "ShowGenreGroup",

  components: { ShowList },

  props: {
    genre: {
      type: String,
      required: true,
    },
    shows: {
      type: Array as PropType<Array<Show>>,
      required: true,
    },
  },
});
</script>
