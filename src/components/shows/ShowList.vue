<template>
  <HorizontalList ref="showList">
    <section v-for="(show, i) in shows" :key="i">
      <ShowCard class="ma-2" :show="show" />
    </section>
  </HorizontalList>
  <v-btn @click="$refs.showList.scrollToIndex(5)">Scroll to 5</v-btn>
  <v-btn @click="$refs.showList.scrollToIndex(0)">Scroll to start</v-btn>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ShowCard from "./ShowCard.vue";
import HorizontalList from "../HorizontalList.vue";

export default defineComponent({
  components: { ShowCard, HorizontalList },
  props: {
    shows: {
      type: Array as PropType<Array<object>>,
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
