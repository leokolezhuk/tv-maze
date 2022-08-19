<template>
  <HorizontalList ref="showList">
    <section v-for="(show, i) in shows" :key="i">
      <ShowCard class="ma-2" :show="show" />
    </section>
  </HorizontalList>
  <v-btn @click="$refs.showList.scrollToIndex(5)">Scroll to 5</v-btn>
  <v-btn @click="$refs.showList.scrollToIndex(0)">Scroll to start</v-btn>
  <v-btn @click="$refs.showList.scrollToIndex(this.shows.length - 1)"
    >Scroll to end</v-btn
  >
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ShowCard from "./ShowCard.vue";
import HorizontalList from "../HorizontalList.vue";
import Show from "@/models/Show";

export default defineComponent({
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
