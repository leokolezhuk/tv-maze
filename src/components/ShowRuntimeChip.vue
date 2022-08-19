<template>
  <v-chip prepend-icon="mdi-calendar-range" :title="title">
    {{ premieredDate }} - {{ endedDate }}
  </v-chip>
</template>

<script lang="ts">
import Show from "@/models/Show";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "ShowRuntimeChip",

  props: {
    show: { type: Object as PropType<Show>, required: true },
  },

  computed: {
    premieredDate(): string {
      return this.show.premiered ?? "Unknown";
    },
    endedDate(): string {
      return this.show.ended ?? "Ongoing";
    },
    title(): string {
      const endedStr = this.show.ended
        ? `and ended on ${this.show.ended}`
        : `and is ongoing`;
      return `The show premiered on ${this.premieredDate} ${endedStr}`;
    },
  },
});
</script>
