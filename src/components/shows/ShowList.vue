<template>
  <HorizontalList ref="showList">
    <section v-for="(show, i) in shows" :key="i">
      <ShowCard class="mr-2" :show="show" />
    </section>
  </HorizontalList>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ShowCard from "./ShowCard.vue";
import HorizontalList from "../HorizontalList.vue";
import Show from "@/models/Show";

export default defineComponent({
  name: "ShowList",

  components: { ShowCard, HorizontalList },

  props: {
    shows: {
      type: Array as PropType<Array<Show>>,
      required: true,
    },
  },

  methods: {
    scrollToIndex(i: number): void {
      (this.$refs.showList as typeof HorizontalList).scrollToIndex(i);
    },
  },
});
</script>
