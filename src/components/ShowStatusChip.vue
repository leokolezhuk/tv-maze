<template>
  <v-chip> {{ show.status }} </v-chip>
</template>

<script lang="ts">
import Show from "@/models/Show";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "ShowStatusChip",
  props: {
    show: { type: Object as PropType<Show>, required: true },
  },
});
</script>
