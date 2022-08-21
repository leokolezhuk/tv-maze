<template>
  <v-card class="search-box">
    <v-text-field
      clearable
      single-line
      hide-details
      placeholder="Search your favourite show"
      v-model="query"
      prepend-inner-icon="mdi-magnify"
      @change="notifyChange"
      @click:clear="notifyChange"
    ></v-text-field>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SearchBox",

  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    changed: ({ query: String }) => true,
  },

  data() {
    return {
      query: "" as string,
    };
  },

  methods: {
    notifyChange() {
      this.$emit("changed", { query: this.query });
    },
  },
});
</script>

<style lang="scss">
.search-box {
  input {
    padding-top: 0;
    padding-bottom: 0;
  }
}
</style>
